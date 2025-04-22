import Form from "./components/Form";
import ListView from "./components/ListView";

export default function Page(){
    return <main className="flex gap-3 pl-2 md:p-5">
        <Form/>
        <ListView/>
    </main>
}