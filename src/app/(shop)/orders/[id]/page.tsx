import { getOrderById } from "@/actions/order/get-order-by-id";
import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import clsx from "clsx";
import Image from "next/image";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";
import { currencyFormat } from "../../../../utils/currencyFormat";

interface Props {
  params: {
    id: string;
  };
}

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default async function OrdersByIdPage({ params }: Props) {
  const { id } = params;
  // todo llamar el server action
  const { ok, order } = await getOrderById(id);

  if (!ok) {
    redirect("/");
  }

  const address = order!.OrderAddress;

  //todo verificar
  //redirect (/)

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-2">
      <div className="flex flex-col w-[1000px] ">
        <Title title={`Order #${id.split("-").at(-1)}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* cart */}
          <div className="flex flex-col mt-5 ">
            <div
              className={clsx(
                "flex items-center rounded-lg py2 px-3.5 font-bold test-xs text-white mb-5",
                {
                  "bg-red-400": !order!.isPaid,
                  "bg-green-600": order!.isPaid,
                }
              )}
            >
              <IoCardOutline size={30} />
              {/* <span className="mx-2">Pendiente de pago</span> */}
              <span className="mx-2">
                {order?.isPaid ? "Pagada" : "No Pagada"}
              </span>
            </div>

            {/* items */}
            {order!.OrderItem.map((item) => (
              <div
                className="flex mb-5 "
                key={item.product.slug + "-" + item.size}
              >
                <Image
                  src={`/products/${item.product.ProductImage[0].url}`}
                  width={100}
                  height={100}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                  alt={item.product.title}
                  className="mb-5 rounded "
                />
                <div className="ml-5">
                  <p>{item.product.title}</p>
                  <p>
                    {item.price} x {item.quantity}
                  </p>
                  <p className="font-bold">
                    Subtotal:{currencyFormat(item.price * item.quantity)}
                  </p>
                  <button></button>
                </div>
              </div>
            ))}
          </div>
          {/* checkout */}
          <div className="p-7 bg-white rounded-xl shadow-xl">
            <h2 className="text-2xl mb-2">Direccion de entrega</h2>

            <div className="mb-10">
              <p className="text-xl">
                {address!.firstName}
                {address!.lastName}
              </p>
              <p className="font-bold">{address!.address}</p>
              <p>{address!.address2}</p>
              <p>{address!.city}</p>
              <p>
                {address!.postalCode} {address!.countryId}
              </p>
              <p>{address!.phone}</p>
            </div>

            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10"></div>

            <h2 className="text-2xl mb-2">Resumen de orden</h2>
            <div className="grid grid-cols-2">
              <span className="">N° Productos</span>
              <span className="text-right">
                {order?.itemsInOrder === 1
                  ? "1 Articulo"
                  : `${order?.itemsInOrder} articulos`}
              </span>

              <span className="">Subtotal</span>
              <span className="text-right">
                {currencyFormat(order!.subTotal)}
              </span>

              <span className="mt-5">Impuestos (21%)</span>
              <span className="text-right mt-5">
                {currencyFormat(order!.tax)}
              </span>

              <span className="text-2xl mt-5">Total</span>
              <span className="text-right mt-5">
                {currencyFormat(order!.total)}
              </span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <div
                className={clsx(
                  "flex items-center rounded-lg py2 px-3.5 font-bold test-xs text-white mb-5",
                  {
                    "bg-red-400": !order!.isPaid,
                    "bg-green-600": order!.isPaid,
                  }
                )}
              >
                <IoCardOutline size={30} />
                {/* <span className="mx-2">Pendiente de pago</span> */}
                <span className="mx-2">
                  {order?.isPaid ? "Pagada" : "No Pagada"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
