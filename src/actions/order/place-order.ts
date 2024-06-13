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
  const { subTotal, tax, total } = productIds.reduce((totals, item) => {
  
    const productQuantity = item.quantity;
    const product = products.find((product) => product.id === item.productId);
    
    if(!product) throw new Error(`${item.productId} no existe - 500`);
    
    const subTotal = product.price * productQuantity;
    
    totals.subTotal += subTotal;
    totals.tax += subTotal * 0.21;
    totals.total += subTotal * 1.21;
    
    
    

      return totals;
    }, { subTotal: 0, tax: 0, total: 0 })
   
  
    console.log( subTotal, tax, total )
 
};
