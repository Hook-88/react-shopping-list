import { FaCheck, FaMinus, FaPlus } from "react-icons/fa6"

import Header from "../components/Header"
import AddItemForm from "./AddItemForm"
import { useState } from "react"
import { groceryItems } from "../data"
import { IoClose } from "react-icons/io5"
import List from "../components/List/List"
import { nanoid } from "nanoid"

export default function ShoppingListPage() {
    const [showAddItemForm, setShowAddItemForm] = useState(false)
    const [shoppingList, setShoppingList] = useState(groceryItems)

    function toggleShowAddItemForm() {
        setShowAddItemForm(prev => !prev)
    }

    function toggleCheckItem(itemId) {
        setShoppingList(prevList => prevList.map(item => item.id === itemId ? {...item, selected: !item.selected} : item))
    }

    function changeQuantity(itemId, num) {
        setShoppingList(prevList => prevList.map(item => item.id === itemId ? {...item, quantity: item.quantity + num} : item))
    }

    function sortListOnSelected() {
        setShoppingList([...shoppingList].sort((a, b) => a.selected - b.selected))
    }

    function deleteSelected() {
        setShoppingList(prevList => prevList.filter(item => item.selected === false))
    }

    function AddItem(value) {
        const newItemObj = {
            id: nanoid(),
            name: value,
            selected: false,
            quantity: 1
        }

        setShoppingList([...shoppingList, newItemObj])

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
                                            changeQuantity(item.id, -1)
                                        }}
                                    >
                                        <FaMinus />
                                    </button>
                                }
                                <button 
                                    className="border border-white/35 rounded-lg p-1 bg-sky-900"
                                    onClick={(event) => {
                                        event.stopPropagation()
                                        changeQuantity(item.id, 1)
                                    }}
                                >
                                    <FaPlus />
                                </button>
                            </List.Item> 
                        ))
                    }

                </List>

                {
                    shoppingList.some(item => item.selected === true) && !showAddItemForm &&
                    <div className="grid grid-cols-6 p-4 gap-4 border border-white/35 rounded-lg">
                        <button 
                            className="bg-green-900 rounded-lg col-span-3 flex items-center justify-between p-2 px-4 border border-white/35"
                            onClick={sortListOnSelected}
                        >
                            Sort
                            <FaCheck />
                        </button>
                        <button 
                            className="p-2 px-4 col-start-4 bg-red-900 rounded-lg col-span-3 flex items-center justify-between border border-white/35"
                            onClick={deleteSelected}
                        >
                            Delete
                            <FaCheck />
                        </button>

                    </div>

                }


                {showAddItemForm && <AddItemForm hide={toggleShowAddItemForm} onSubmit={AddItem}/>}
            </main>
        </>
    )
}