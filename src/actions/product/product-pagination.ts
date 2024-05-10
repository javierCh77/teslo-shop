"use server";
import prisma from "@/lib/prisma";



export const getPaginatedProductsWithImages = async () => {

  try {
    const products = await prisma.product.findMany({
      take:3,
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
          }
        }
      }
    })
    
    
    console.log(products);
    
    return{
        currentPage:1,
        totalPage:10,
        products: products.map( product => ({
            ...product,
            images:product.ProductImage.map(image => image.url)
        }))
    }
  } catch (error) {
    throw new Error("no se puede cargar los productos");
  }
};
