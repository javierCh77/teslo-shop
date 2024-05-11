import { ProductSlideshow, QuantitySelector, SizeSelector, ProductMobileSlideshow } from "@/components";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: {
    slug: string;
  };
}

export default function ProductBySlugPage ({ params }: Props) {
  const { slug } = params;
  const product = initialData.products.find((product) => product.slug === slug);

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
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-2xl mb-5">$ {product.price}</p>
        {/* selector de talla */}
          <SizeSelector
            selectSize={product.sizes[0]}
            availableSizes={product.sizes}
          />
        {/* selector de cantidad  */}
        
        <QuantitySelector
          quantity={2}
        />

        {/* Button */}
        <button className="btn-primary my-5">Agregar al Carrito</button>

        <h3 className="font-bold text-sm">Descripción</h3>
        <p>{product.description}</p>
      </div>
    </div>
  );
}
