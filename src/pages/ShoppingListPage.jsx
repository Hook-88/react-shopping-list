import { FaCheck, FaMinus, FaPlus } from "react-icons/fa6"

import Header from "../components/Header"
import AddItemForm from "./AddItemForm"
import { useState } from "react"
import { groceryItems } from "../data"
import List from "../components/List/List"
import QuantitySpan from "../components/QuantitySpan"

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

                <List 
                    title="general"
                >
                    {
                        groceryItems.map(item => ( item.checked ? 
                            
                            <List.ItemSelected
                                key={item.id}
                            >
                                {item.name}
                            </List.ItemSelected> :

                            <List.Item
                                key={item.id}
                            >   
                                {item.name}
                                {item.quantity > 1 &&` (${item.quantity}x)`}
                                <div>
                                    {
                                        item.quantity > 1 && 
                                        <button className="border border-white/35 rounded-lg p-1 mr-2">
                                            <FaMinus />
                                        </button>
                                    }
                                    
                                    <button className="border border-white/35 rounded-lg p-1">
                                        <FaPlus />
                                    </button>
                                </div>
                            </List.Item> 
                        ))
                    }

                </List>

                {showAddItemForm && <AddItemForm />}
            </main>
        </>
    )
}