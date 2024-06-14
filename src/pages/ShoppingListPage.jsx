import { FaCheck, FaMinus, FaPlus } from "react-icons/fa6"
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
import { atom, useSetAtom, useAtom } from "jotai"
import ActionButtonsEl from "./ActionButtonsEl"
import { addItemAtom } from "./AddItemForm"

export const shoppingListAtom = atom(null)


export default function ShoppingListPage() {  
    const [shoppingList, setShoppingList] = useAtom(shoppingListAtom)
    // const updateConfirmModal = useStore(state => state.updateConfirmModal)
    const generalListDocRef = doc(db, "shoppingList", "DhAnx7FUB4kZNnEgPRWS")
    const setShowAddItem = useSetAtom(addItemAtom)
    
    // function showModal() {
    //     updateConfirmModal({
    //         confirmQuestion: "Are you sure",
    //         onConfirm: deleteSelected
    //     })
    // }

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


    // if (shoppingList?.items.length === 0) {
    //     console.log("empty list")
    //     setShowAddItem(true)
    // }

    return (
        <>
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
                <ActionButtonsEl />
                <AddItemForm onSubmit={AddItem}/>

            </main>

            <ConfirmActionModal />

        </>
    )
}

// TODO add navlink