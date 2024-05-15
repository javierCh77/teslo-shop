'use client'

import { useUIStore } from "@/store";
import Link from "next/link";
import React from "react";
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonAddOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline,} from "react-icons/io5";
import clsx from 'clsx'
import { logout } from "@/actions";



export const SideBar = () => {

    const isSideMenuOpen = useUIStore(state => state.isSideMenuOpen);
    const closeMenu = useUIStore(state => state.closeSideMenu);
    

  return (
  
    <div>
      {/* aqui background blac */}
        {
            isSideMenuOpen && (
                <div 
                className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"></div>
                              )
        }
      {/* aqui background blur */}
        {
        isSideMenuOpen && (
            <div
            onClick={closeMenu}
            className="fade-in fixed top-0 left-0 w-screen h-screen z-10  backdrop-filter backdrop-blur-sm"></div>
                          )    
        }
      {/* side menu */}
      <nav className={
              clsx(
                "bg-white fixed p-5 right-0 top-0 w-[300px] h-screen  z-20 shadow-2xl transform transition-all duration-300",
                {
                    "translate-x-full": !isSideMenuOpen   
                }
              )
      }>
      
        <IoCloseOutline
          size={30}
          onClick={()=>closeMenu()}
          className="absolute top-5 right-5 cursor-pointer"
        />
        <div className="relative mt-10">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="buscar"
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-lg border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>
        {/* ipciones de menu */}
        <Link
          href="/profile"
          onClick={()=>closeMenu()}
          className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoPersonAddOutline size={20} />
          <span className="ml-3 text-lg">Perfil</span>
        </Link>

        <Link
          href="/"
          className="flex items-center mt-5 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoTicketOutline size={20} />
          <span className="ml-3 text-lg">Ordenes</span>
        </Link>

        <Link
          href="/"
          className="flex items-center mt-2 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoLogInOutline size={20} />
          <span className="ml-3 text-lg">Ingresar</span>
        </Link>

        <button
          onClick={() => logout()}
          className="flex ww-full items-center mt-2 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoLogOutOutline size={20} />
          <span className="ml-3 text-lg">Salir</span>
        </button>
        {/*  line separator */}
        <div className="w-full h-px bg-gray-200 my-10 rounded" />
        <Link
          href="/"
          className="flex items-center mt-2 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoShirtOutline size={20} />
          <span className="ml-3 text-lg">Productos</span>
        </Link>
        <Link
          href="/"
          className="flex items-center mt-2 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoTicketOutline size={20} />
          <span className="ml-3 text-lg">Ordenes</span>
        </Link>
        <Link
          href="/"
          className="flex items-center mt-2 p-2 hover:bg-gray-100 rounded transition-all"
        >
          <IoPeopleOutline size={20} />
          <span className="ml-3 text-lg">Clientes</span>
        </Link>
      </nav>
    </div>
  );
};
