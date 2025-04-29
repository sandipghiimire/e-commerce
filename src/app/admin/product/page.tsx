import Link from "next/link";
import ListView from "../product/components/listView"

export default function Page() {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex justify-between pt-5 px-4">
                <div className="text-lg font-semibold"> Products </div>
                <Link href={'/admin/product/form'}><button className="bg-black text-white text-sm px-4 py-2 rounded-lg">Create</button></Link>
            </div>
            <div className="ml-5 mr-5">
                <ListView />
            </div>
        </div>
    )
}