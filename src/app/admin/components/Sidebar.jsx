import { Cat, Layers2, LayoutDashboard, LibraryBig, LogOut, ShoppingBag, ShoppingBasket, SquareUserRound, Star } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Sidebar() {
    const menuList = [{
        name: "Dashboard",
        icon: <LayoutDashboard />,
        link: "/admin"
    },
    {
        name: "Product",
        icon: <ShoppingBasket />,
        link: "/admin/product"
    },
    {
        name: "Order",
        icon: <ShoppingBag />,
        link: "/admin/order"
    },
    {
        name: "Categories",
        icon: <Layers2 />,
        link: "/admin/categories"
    },
    {
        name: "Brand",
        icon: <Cat />,
        link: "/admin/brand"
    },
    {
        name: "Customers",
        icon: <SquareUserRound />,
        link: "/admin/customer"
    },
    {
        name: "Reviews",
        icon: <Star />,
        link: "/admin/reviews"
    },
    {
        name: "Collections",
        icon: <LibraryBig />,
        link: "/admin/collection"
    },
    ]
    return <section className="bg-white h-screen px-5 py-3 overflow-hidden md:w-[290px] flex flex-col gap-5 shadow-xl">
        <div className="flex gap-3 pb-3 pt-4 justify-center">
            <img src="/logo-removebg-preview.png" alt="loho" className="h-7" />
            <h1 className="font-bold text-2xl">TRIGGER</h1>
        </div>
        <div className="flex-1 flex flex-col gap-4 h-full overflow-y-auto">
            {menuList?.map((item, key) => {
                return <Tab item={item} key={key}></Tab>
            })}
        </div>
        <div className="flex justify-center hover:bg-red-600 hover:text-white py-2 rounded-lg">
            <button className="flex justify-center items-center gap-3"> <LogOut /> Logout</button>
        </div>
    </section>
}

function Tab({ item }) {
    const pathname = usePathname();
    const isSelected = pathname === item?.link;
    return (
            <Link href={item.link}>
                <div className={`flex items-center gap-3 py-2 rounded-xl hover:bg-blue-400 px-4 font-semibold hover:text-white ease-soft-spring transition-all duration-300 ${isSelected ? "bg-blue-400 text-white" : "bg-white text-black"}`}>
                    {item.icon} {item.name}
                </div>
            </Link>
    )
}