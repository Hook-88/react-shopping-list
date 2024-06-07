import { FaPlus } from "react-icons/fa6"

import Header from "../components/Header"

export default function ShoppingListPage() {
    
    return (
        <>
            <Header>
                <h1 className="col-span-4 col-start-2 text-center font-bold">SHOPPING</h1>
                <button className="flex items-center justify-center">
                    <FaPlus />
                </button>
            </Header>
            <main className="px-4 flex flex-col mt-2">
                <form className="grid grid-cols-6">
                    <input type="text" placeholder="name" className="col-span-6 text-center"/>
                    <select className="col-span-2">
                        <option value="general">General</option>
                    </select>
                    <button type="button" className="col-start-5">Close</button>
                    <button type="submit">Add</button>
                </form>
            </main>
        </>
    )
}