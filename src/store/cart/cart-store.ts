import type { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];
  
  getTotalItems:() =>number;

  //addproduct to carty
  addProductTocart: (product: CartProduct) => void;

  //updateProductquantiy

  //deleteProduct
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      //methods
        
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },
      
      // logica para agregar un producto
      addProductTocart: (product: CartProduct) => {
        const { cart } = get();
        //1 revisar si el producto existe con la talla seleccionada
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );
        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }
        // 2- se que el producto existe por talla tengo q incrementar
        const updateCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return { ...item, quantity: item.quantity + product.quantity };
          }
          return item;
        });

        set({ cart: updateCartProducts });
      },
    }),

    {
      name: "shopping-cart",
      
    }
  )
);
