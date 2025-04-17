import Link from "next/link";

export default function Header(){
    const menuList = [
        {
            name: "Home",
            link: "/"
        },
        {
            name: "About",
            link: "/about"
        },
        {
            name: "Contact",
            link: "/contact"
        },
    ];
    return(
    <nav className="py-4 px-20 border-b flex items-center justify-between">
        <img className="h-9" src="/logo-removebg-preview.png" alt="logo" />
        <div className="flex gap-3 items-center">
            {menuList?.map((items)=>{
                return <Link href={items.link}>
                    <button>{items?.name}</button>
                </Link>
            })}
        </div>
        <Link href={'/login'}>
        <button className="bg-blue-600 px-5 py-2 rounded-full font-bold text-white">Login</button></Link>
    </nav>    
    )
}