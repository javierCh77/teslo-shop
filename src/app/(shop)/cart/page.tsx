import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ProductInCart } from "./ui/ProductInCart";
import { OrderSummary } from "./ui/OrderSummary";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];




export default function CartPage () {
    
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
            
            <ProductInCart/>
            
          </div>
          {/* checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
          <h2 className="text-2xl mb-2">Resumen de la orden</h2>
          
           <OrderSummary/>
            
            
            
            
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
