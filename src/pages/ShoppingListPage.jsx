import { FaPlus } from "react-icons/fa6"

import Header from "../components/Header"
import { IoClose } from "react-icons/io5"

export default function ShoppingListPage() {
    
    return (
        <>
            <Header>
                <h1 className="col-span-4 col-start-2 text-center font-bold">SHOPPING</h1>
                <button className="flex items-center justify-center">
                    <FaPlus />
                </button>
            </Header>
            <main className="px-4 flex flex-col">
                <form className="grid grid-cols-6 p-4 gap-2 border border-white/35 rounded-lg">
                    <input type="text" placeholder="name" className="col-span-6 text-center bg-white/10 rounded-lg py-2 mb-2"/>
                    <select className="col-span-3 bg-white/10 rounded-lg p-2">
                        <option value="general">General</option>
                    </select>
                    <button type="button" className="col-start-5 bg-red-900 rounded-lg text-2xl flex items-center justify-center">
                        <IoClose />
                    </button>
                    <button type="submit" className="bg-green-900 rounded-lg">Add
                        
                    </button>
                </form>
            </main>
        </>
    )
}