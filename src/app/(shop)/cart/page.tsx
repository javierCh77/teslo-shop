import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];




export default function () {
    
    // redirect('/empty')
    

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-2">
      <div className="flex flex-col w-[1000px] ">
        <Title title="Cart" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* cart */}
          <div className="flex flex-col mt-5 ">
            <span className="text-xl">Agregar mas items</span>
            <Link href="/" className=" underline mb-5">
              Continuar comprando
            </Link>

            {/* items */}
            {productsInCart.map((product) => (
              <div className="flex mb-5" key={product.slug}>
                <Image
                  src={`/products/${product.images[0]}`}
                  width={100}
                  height={100}
                  style={{
                    width: '100px',
                    height: '100px',
                  }}
                  alt={product.title}
                  className="mb-5 rounded"
                />
                <div className="ml-5">
                  <p>{product.title}</p>
                  <p>{product.price}</p>
                  <QuantitySelector quantity={3} />
                  <button></button>
                </div>
              </div>
            ))}
          </div>
          {/* checkout */}
          <div className="right-10 p-7 bg-white rounded-xl shadow-xl h-fit">
            <h2 className="text-2xl mb-2">Resumen de orden</h2>
            <div className="grid grid-cols-2">
              
              <span className="">N° Productos</span>
              <span className="text-right">3 articulos</span>
              
              <span className="">Subtotal</span>
              <span className="text-right">$100</span>
              
              <span className="text-2xl mt-5" >Total</span>
              <span className="text-right mt-5">$100</span>
            </div>
            
            <div className="mt-5 mb-2 w-full">
              <Link 
              className="flex btn-primary justify-center"
              href="/checkout/address">
                  Checkout             
              </Link>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
