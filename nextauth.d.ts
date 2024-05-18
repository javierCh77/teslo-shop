// archivo de definicion de ts
//template de seccion para traer los datos necesarios por seguridad 

import NextAuth, {DefaultSession} from "next-auth";


declare module 'next-auth'{

    interface Session{
    user:{
        id:string;
        name:string;
        email:string;
        emailVerified?:boolean;
        role:string;
        image?:string;
        
    } & DefaultSession['user'];  
    
    }
}