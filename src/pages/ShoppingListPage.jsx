import { FaCheck, FaMinus, FaPlus } from "react-icons/fa6"

import Header from "../components/Header"
import AddItemForm from "./AddItemForm"
import { useState } from "react"

export default function ShoppingListPage() {
    const [showAddItemForm, setShowAddItemForm] = useState(false)

    function toggleShowAddItemForm() {
        setShowAddItemForm(prev => !prev)
    }

    // TODO make components for list
    
    return (
        <>
            <Header>
                <h1 className="col-span-4 col-start-2 text-center font-bold">SHOPPING</h1>
                <button 
                    className="flex items-center justify-end pr-5"
                    onClick={toggleShowAddItemForm}
                >
                    {
                        showAddItemForm ? <FaCheck /> : <FaPlus />
                    }
                </button>
            </Header>
            <main className="px-4 flex flex-col gap-4">
                <ul className="grid gap-2">
                    <li className="border border-white/35 rounded-lg px-4 py-2 flex justify-between">
                        Beer
                        <button className="border border-white/35 rounded-lg p-1 col-start-6">
                            <FaPlus />
                        </button>
                    </li>
                    <li className="border border-white/35 rounded-lg px-4 py-2 flex justify-between">
                        2x Wine
                        <div>
                            <button className="border border-white/35 rounded-lg p-1 col-start-6 mr-2">
                                <FaMinus />
                            </button>
                            <button className="border border-white/35 rounded-lg p-1 col-start-6">
                                <FaPlus />
                            </button>
                        </div>
                    </li>
                    <li className="border border-white/35 rounded-lg px-4 py-2 flex justify-between bg-green-900">
                        Arroz
                            <span className="border border-white/0 rounded-lg p-1 col-start-6 ">
                                <FaCheck />
                            </span>

                    </li>
                </ul>
                {showAddItemForm && <AddItemForm />}
            </main>
        </>
    )
}