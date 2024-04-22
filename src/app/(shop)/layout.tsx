import { TopMenu, SideBar } from '@/components'




export const metadata = {
 title: 'Shop virtual',
 description: 'test',
};



export default function ShopLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <main className=" min-h-screen">
    <TopMenu/>
    <SideBar/>
    <div className='px-2 sm:px-10 '>
     {children}
    </div>
    
    </main>
  );
}