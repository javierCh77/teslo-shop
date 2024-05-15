export const revalidate = 604800 ; // 7dias aprox

import { getProductBySlug } from "@/actions";
import { ProductSlideshow, QuantitySelector, SizeSelector, ProductMobileSlideshow, StockLabel } from "@/components";
import { titleFont } from "@/config/fonts";
import { Metadata, ResolvedMetadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
import { AddToCart } from "./ui/AddToCart";

interface Props {
  params: {
    slug: string;
  };
}

//META DATA
export async function generateMetadata({params}:Props, parent:ResolvedMetadata):Promise<Metadata>{
  const slug = params.slug
  const product = await getProductBySlug(slug);
  return {
  
    title: product?.title ?? 'Producto no encontrado',
    description : product?.description ?? "",
    openGraph:{
      title: product?.title ?? " Producto no encontrado",
      description : product?.description ?? "",
      //aqui colocar la ruta de la imagen 
      images:[`/products/${product?.images[1]}`],
    },
  };
}



export default async function ProductBySlugPage ({ params }: Props) {

  const { slug } = params;
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3  ">
      {/*Slide Show */}

      <div className="col-span-1 md:col-span-2 ">
      
      
      {/* mobile slideshow */}
        <ProductMobileSlideshow
          title={product.title}
          images={ product.images }
          className="block md:hidden"
        />
      
      {/*desktop slideshow */}
         <ProductSlideshow
          title={product.title}
          images={ product.images }
          className="hidden md:block"
        /> 
      </div>
      <div className="col-span-1 px-5 ">
      
        {/* el tock quiero que tenga impacto en tiempo real del cache */}
      
        <StockLabel 
          slug={product.slug}
        />
       
        
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        
        <p className="text-2xl mb-5">$ {product.price}</p>
       
        <AddToCart product={product}/>
       
        <h3 className="font-bold text-sm">Descripción</h3>
        <p>{product.description}</p>
      </div>
    </div>
  );
}
