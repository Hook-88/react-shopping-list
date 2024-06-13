import { FaCheck, FaMinus, FaPlus } from "react-icons/fa6"
import Header from "../components/Header"
import AddItemForm from "./AddItemForm"
import { useEffect, useState } from "react"
import List from "../components/List/List"
import { nanoid } from "nanoid"
import Card from "../components/Card"
import ConfirmActionModal from "../components/ConfirmActionModal"
import { useStore } from "../store/store"
import { doc, onSnapshot, updateDoc, getDoc } from "firebase/firestore"
import { db } from "../firebase/firebase"
import getCapString from "../utility/getCapString"
import ShoppingListPageHeader from "./ShoppingListPageHeader"

export default function ShoppingListPage() {
    const [showAddItemForm, setShowAddItemForm] = useState(false)
    const [shoppingList, setShoppingList] = useState(null)
    const updateConfirmModal = useStore(state => state.updateConfirmModal)
    const generalListDocRef = doc(db, "shoppingList", "DhAnx7FUB4kZNnEgPRWS")
    
    function showModal() {
        updateConfirmModal({
            confirmQuestion: "Are you sure",
            onConfirm: deleteSelected
        })
    }

    function toggleShowAddItemForm() {
        setShowAddItemForm(prev => !prev)
    }

    async function toggleCheckItem(itemId) {
        const newListArray = shoppingList.items.map(item => item.id === itemId ? {...item, selected: !item.selected} : item)
        
        await updateDoc(generalListDocRef, {items: newListArray})
    }

    async function changeQuantity(itemId, num) {
        const newListArray = shoppingList.items.map(item => item.id === itemId ? {...item, quantity: item.quantity + num} : item)
        
        await updateDoc(generalListDocRef, {items: newListArray})
    }

    async function sortListOnSelected() {
        const sortedList = [...shoppingList.items].sort((a, b) => a.selected - b.selected)

        await updateDoc(generalListDocRef, {items: sortedList})
    }

    async function deleteSelected() {
        const newListArray = shoppingList.items.filter(item => item.selected === false)
        
        await updateDoc(generalListDocRef, {items: newListArray})
    }

    async function AddItem(value) {
        const newItemObj = {
            id: nanoid(),
            name: value.trim().toLowerCase(),
            selected: false,
            quantity: 1
        }

        await updateDoc(generalListDocRef, {items: [...shoppingList.items, newItemObj]})
    }

    useEffect(() => {
        const unsub = onSnapshot(generalListDocRef, snapshot => {
            //sync up with local state
            setShoppingList(snapshot.data())
        })

        return unsub
    }, [])
    
    return (
        <>
            {/* <Header>
                <h1 className="col-span-4 col-start-2 text-center self-center font-bold">SHOPPING</h1>
                <button 
                    className="flex items-center justify-end pr-5 py-3"
                    onClick={toggleShowAddItemForm}
                >
                    {
                        showAddItemForm ? <FaCheck /> : <FaPlus />
                    }
                </button>
            </Header> */}
            <ShoppingListPageHeader />
            <main className="px-4 flex flex-col gap-4 pb-40 mt-12">

                {
                    shoppingList ?
                    <List
                    title={shoppingList.name} 
                >
                    {
                        shoppingList.items.map(item => ( item.selected ? 
                            
                            <List.ItemSelected
                                key={item.id}
                                onClick={() => toggleCheckItem(item.id)}
                            >
                                {getCapString(item.name)}
                                {item.quantity > 1 &&` (${item.quantity}x)`}
                            </List.ItemSelected> :

                            <List.Item
                                key={item.id}
                                onClick={() => toggleCheckItem(item.id)}
                            >   
                                {getCapString(item.name)}
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

                </List> : null 
                }

                

                {
                    shoppingList && shoppingList.items.some(item => item.selected === true) && !showAddItemForm &&
                    <Card className="fixed inset-x-0 bottom-3 mx-4">
                        <button 
                            className="bg-green-900 rounded-lg col-span-3 flex items-center justify-between p-2 px-4 border border-white/35"
                            onClick={sortListOnSelected}
                        >
                            Sort
                            <FaCheck />
                        </button>
                        <button 
                            className="p-2 px-4 col-start-4 bg-red-900 rounded-lg col-span-3 flex items-center justify-between border border-white/35"
                            onClick={showModal}
                        >
                            Delete
                            <FaCheck />
                        </button>

                    </Card>

                }

                {showAddItemForm && <AddItemForm hide={toggleShowAddItemForm} onSubmit={AddItem}/>}
            </main>

            <ConfirmActionModal />

        </>
    )
}

// TODO add navlink