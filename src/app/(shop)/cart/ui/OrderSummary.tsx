"use client";

import {useCartStore} from '@/store'
import { currencyFormat } from '@/utils';
import { useEffect, useState } from "react";

export const OrderSummary = () => {

    const [loaded, setLoaded] = useState(false)
    const { itemsInCart, subTotal, tax,total  } = useCartStore(state => state.getSummaryInformation());
    
    
    useEffect(() =>{
        setLoaded(true);
    },[]);

    if(!loaded) return <p>Loading...</p>


  return (
    <>
      <div className="grid grid-cols-2">
        <span className="">N° Productos</span>
        <span className="text-right">{itemsInCart === 1 ?'1 Articulo':`${itemsInCart} articulos` }</span>

        <span className="">Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>

        <span className="mt-5">Impuestos (21%)</span>
        <span className="text-right mt-5">{currencyFormat(tax)}</span>
        
        <span className="text-2xl mt-5">Total</span>
        <span className="text-right mt-5">{currencyFormat(total)}</span>
      </div>
    </>
  );
};
