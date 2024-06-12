import { QuantitySelector, Title } from "@/components";

import Image from "next/image";
import Link from "next/link";
import { ProductInCart } from "./ui/ProductInCart";
import { PlaceOrder } from "./ui/PlaceOrder";



export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-2">
      <div className="flex flex-col w-[1000px] ">
        <Title title="Verificar orden" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* cart */}
          <div className="flex flex-col mt-5 ">
            <span className="text-xl">Ajustar elementos</span>
            <Link href="/cart" className=" underline mb-5">
              Editar carrito
            </Link>

            <ProductInCart />
          </div>
          {/* checkout */}
            <PlaceOrder/>
        </div>
      </div>
    </div>
  );
}
