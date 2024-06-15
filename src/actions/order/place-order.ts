"use server";

import { auth } from "@/auth.config";
import type { Address, Size } from "@/interfaces";
import { Product } from "../../interfaces/product.interface";
import prisma from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address
) => {
  const session = await auth();
  const userId = session?.user.id;

  // verificar session de usuario
  if (!userId) {
    return {
      ok: false,
      message: "No hay sesion de usuario",
    };
  }
  //obtener info de productos que podemos llevar 2 productos con el mismo id
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((p) => p.productId),
      },
    },
  });
  //calcular los montos
  const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);

  // los totales de tax subtotal y total
  const { subTotal, tax, total } = productIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((product) => product.id === item.productId);

      if (!product) throw new Error(`${item.productId} no existe - 500`);

      const subTotal = product.price * productQuantity;

      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.21;
      totals.total += subTotal * 1.21;

      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 }
  );

  // crear transaccion de base de datos
  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      // 1. actualizar el stock de los productos
      const updatedProductsPromises = products.map(async (product) => {
        //acumular los valores
        const productQuantity = productIds
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0);
        // validacion
        if (productQuantity === 0) {
          throw new Error(`${product.id} no tiene cantidad definida`);
        }

        return tx.product.update({
          where: { id: product.id },
          data: {
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);
      // verificar valores negativo en la existencia
      updatedProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(`${product.title} No tiene inventario suficiente`);
        }
      });
      // 2. crear la orden - encabezado - detalle
      const order = await tx.order.create({
        data: {
          userId: userId,
          itemsInOrder: itemsInOrder,
          subTotal: subTotal,
          tax: tax,
          total: total,

          OrderItem: {
            createMany: {
              data: productIds.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price:
                  products.find((product) => product.id === p.productId)
                    ?.price ?? 0,
              })),
            },
          },
        },
      });
      // 3. crear la direccion de la orden
      // adress
      const { country, ...restAddress } = address;
      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          countryId: country,
          orderId: order.id,
        },
      });
      return {
        order: order,
        updatedProduct: updatedProducts,
        orderAddress: orderAddress,
      };
    });

    return {
      ok: true,
      order: prismaTx.order,
      prismaTx: prismaTx,
    };
  } catch (error: any) {
    return {
      ok: false,
      message: error?.message,
    };
  }
};
