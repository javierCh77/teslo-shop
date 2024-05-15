"use client";

import { QuantitySelector } from "@/components";
import { useCartStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const ProductInCart = () => {

  const updateProductQuantity = useCartStore((state) => state.updateProductQuantity);
  const removeProduct = useCartStore((state) => state.removeProduct);
  const [loaded, setLoaded] = useState(false);
  const productsInCart = useCartStore((state) => state.cart);
  
  
  useEffect(() =>{
    setLoaded(true);
  })
  
  if(!loaded){
    return <p>Loading...</p>
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div className="flex mb-5" key={`${product.slug}-${product.size}`}>
          <Image
            src={`/products/${product.image}`}
            width={100}
            height={100}
            style={{
              width: "100px",
              height: "100px",
            }}
            alt={product.title}
            className="mb-5 rounded"
          />
          <div className="ml-5">
            <Link 
            className="hover:underline cursor-pointer"
            href={`/product/${product.slug}`}>
             {product.size} - {product.title}
            </Link>
           
            <p>{product.price}</p>
            <QuantitySelector
              onQuantityChanged={quantity => updateProductQuantity(product, quantity)}
              quantity={product.quantity}
            />
            <button
            onClick={()=>removeProduct(product)}
            className="underline mt-3">Remover</button>
          </div>
        </div>
      ))}
    </>
  );
};
