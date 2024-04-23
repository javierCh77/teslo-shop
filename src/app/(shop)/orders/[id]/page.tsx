import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { IoCardOutline } from "react-icons/io5";


interface Props {
  params:{
    id:string;
  }
}

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];


export default function ({params}: Props) {
    
    const {id} = params;
    
    //todo verificar 
    //redirect (/)
    
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-2">
      <div className="flex flex-col w-[1000px] ">
        <Title title={`Order #${id}`} />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* cart */}
          <div className="flex flex-col mt-5 ">
            <div className={
              clsx(
                "flex items-center rounded-lg py2 px-3.5 font-bold test-xs text-white mb-5",
                {
                  'bg-red-400':false,
                  'bg-green-600':true,
                }
              )
            }> 
            
              <IoCardOutline size={30}/>
              {/* <span className="mx-2">Pendiente de pago</span> */}
              <span className="mx-2">Pagada</span>
            </div>

            {/* items */}
            {productsInCart.map((product) => (
              <div className="flex mb-5 " key={product.slug}>
                <Image
                  src={`/products/${product.images[0]}`}
                  width={100}
                  height={100}
                  style={{
                    width: '100px',
                    height: '100px',
                  }}
                  alt={product.title}
                  className="mb-5 rounded "
                />
                <div className="ml-5">
                  <p>{product.title}</p>
                  <p>{product.price}</p>
                  <p className="font-bold">Subtotal: ${product.price * 3}</p>
                  <button></button>
                </div>
              </div>
            ))}
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
              <div className="w-full h-0.5 rounded bg-gray-200 mb-10">
              
              
              
              
              
              
              
              </div>
            
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
            <div className={
              clsx(
                "flex items-center rounded-lg py2 px-3.5 font-bold test-xs text-white mb-5",
                {
                  'bg-red-400':false,
                  'bg-green-600':true,
                }
              )
            }> 
            
              <IoCardOutline size={30}/>
              {/* <span className="mx-2">Pendiente de pago</span> */}
              <span className="mx-2">Pagada</span>
            </div>
            
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
