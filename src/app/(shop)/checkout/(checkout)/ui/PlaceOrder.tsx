"use client";

import { placeOrder } from "@/actions";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat, sleep } from "@/utils";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export const PlaceOrder = () => {

  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  //gestor de estado con la info que necesito
  //traigo el store de la direccion
  const address = useAddressStore((state) => state.address);
  //traigo el store del carro
  const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
    state.getSummaryInformation()
  );
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  ////////////////////////////////////////////////////////////////////

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));

    console.log({ address, productsToOrder });

    //await sleep(2);
    //todo server accion
    const resp = await placeOrder(productsToOrder, address);
    if(!resp.ok){
      setIsPlacingOrder(false);
      setErrorMessage(resp.message);
    return;
    }
    clearCart();
    router.replace('/orders/'+ resp.order?.id);
    
  };

  if (!loaded) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="p-7 bg-white rounded-xl shadow-xl">
      <h2 className="text-2xl mb-2">Direccion de entrega</h2>

      <div className="mb-10">
        <p className="text-xl">
          {address.firstName}
          {address.lastName}
        </p>
        <p className="font-bold">{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.city}</p>
        <p>
          {address.postalCode} {address.country}
        </p>
        <p>{address.phone}</p>
      </div>

      {/* Divider */}
      <div className="w-full h-0.5 rounded bg-gray-200 mb-10"></div>

      <h2 className="text-2xl mb-2">Resumen de orden</h2>
      <div className="grid grid-cols-2">
        <span className="">N° Productos</span>
        <span className="text-right">
          {itemsInCart === 1 ? "1 Articulo" : `${itemsInCart} articulos`}
        </span>

        <span className="">Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>

        <span className="mt-5">Impuestos (21%)</span>
        <span className="text-right mt-5">{currencyFormat(tax)}</span>

        <span className="text-2xl mt-5">Total</span>
        <span className="text-right mt-5">{currencyFormat(total)}</span>
      </div>

      <div className="mt-5 mb-2 w-full">
        {/* Disclaimer */}
        <p className="mb-5">
          <span className="text-xs">
            Al hacer click en "colocar orden", aceptas nuestros{" "}
            <a href="#" className="underline">
              terminos y condiciones
            </a>
          </span>
        </p>

        <p className="text-red-500">{errorMessage}</p>
        <button
          //href="/orders/123"
          onClick={onPlaceOrder}
          className={clsx({
            "btn-primary": !isPlacingOrder,
            "btn-disabled": isPlacingOrder,
          })}
        >
          Colocar orden
        </button>
      </div>
    </div>
  );
};
