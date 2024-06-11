import { QuantitySelector, Title } from "@/components";

import Image from "next/image";
import Link from "next/link";
import { ProductInCart } from "./ui/ProductInCart";


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
          <div className="p-7 bg-white rounded-xl shadow-xl">
            <h2 className="text-2xl mb-2">Direccion de entrega</h2>

            <div className="mb-10">
              <p className="text-xl">Javier Chavarria</p>
              <p className="font-bold">Av.Siempre viva</p>
              <p>Col.Centro</p>
              <p>Ushuaia</p>
              <p>CP:9410</p>
              <p>Telefono : 34328318</p>
            </div>

            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10"></div>

            <h2 className="text-2xl mb-2">Resumen de orden</h2>
            <div className="grid grid-cols-2">
              <span className="">N° Productos</span>
              <span className="text-right">3 articulos</span>

              <span className="">Subtotal</span>
              <span className="text-right">$100</span>

              <span className="text-2xl mt-5">Total</span>
              <span className="text-right mt-5">$100</span>
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

              <Link
                className="flex btn-primary justify-center"
                href="/orders/123"
              >
                Colocar orden
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
