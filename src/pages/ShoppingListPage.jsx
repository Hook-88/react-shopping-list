import { FaCheck, FaMinus, FaPlus } from "react-icons/fa6"

import Header from "../components/Header"
import AddItemForm from "./AddItemForm"
import { useState } from "react"
import { groceryItems } from "../data"
import List from "../components/List/List"
import QuantitySpan from "../components/QuantitySpan"

export default function ShoppingListPage() {
    const [showAddItemForm, setShowAddItemForm] = useState(false)
    const [shoppingList, setShoppingList] = useState(groceryItems)

    function toggleShowAddItemForm() {
        setShowAddItemForm(prev => !prev)
    }

    function toggleCheckItem(itemId) {
        setShoppingList(prevList => prevList.map(item => item.id === itemId ? {...item, selected: !item.selected} : item))
    }

    function addOne(itemId, num) {
        setShoppingList(prevList => prevList.map(item => item.id === itemId ? {...item, quantity: item.quantity + num} : item))
    }

    function handleAddOne(event, itemId) {
        event.stopPropagation()
        addOne(itemId)

    }
    
    return (
        <>
            <Header>
                <h1 className="col-span-4 col-start-2 text-center self-center font-bold">SHOPPING</h1>
                <button 
                    className="flex items-center justify-end pr-5 py-2"
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
                        shoppingList.map(item => ( item.selected ? 
                            
                            <List.ItemSelected
                                key={item.id}
                                onClick={() => toggleCheckItem(item.id)}
                            >
                                {item.name}
                            </List.ItemSelected> :

                            <List.Item
                                key={item.id}
                                onClick={() => toggleCheckItem(item.id)}
                            >   
                                {item.name}
                                {item.quantity > 1 &&` (${item.quantity}x)`}
                                {
                                    item.quantity > 1 && 
                                    <button 
                                        className="border border-white/35 rounded-lg p-1 mr-2 ml-auto bg-red-900"
                                        onClick={(event) => {
                                            event.stopPropagation()
                                            addOne(item.id, -1)
                                        }}
                                    >
                                        <FaMinus />
                                    </button>
                                }
                                <button 
                                    className="border border-white/35 rounded-lg p-1 bg-sky-900"
                                    onClick={(event) => {
                                        event.stopPropagation()
                                        addOne(item.id, 1)
                                    }}
                                >
                                    <FaPlus />
                                </button>
                            </List.Item> 
                        ))
                    }

                </List>

                {showAddItemForm && <AddItemForm />}
            </main>
        </>
    )
}