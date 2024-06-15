import { FaEllipsis, FaMinus, FaPlus } from "react-icons/fa6"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { shoppingListAtom } from "../atom"
import { useEffect } from "react"
import { doc, onSnapshot, updateDoc } from "firebase/firestore"
import { db } from "./../firebase/firebase"
import Menu from "../components/Menu/Menu"
import ShoppingListEl from "./ShoppingListEl"
import Card from "../components/Card"
import ConfirmActionModal from "../components/ConfirmActionModal"
import { useStore } from "../store/store"
import { doc, onSnapshot, updateDoc, getDoc } from "firebase/firestore"
import { db } from "../firebase/firebase"
import getCapString from "../utility/getCapString"
import ShoppingListPageHeader from "./ShoppingListPageHeader"
import addItemAtom from "./AddItemForm"
import { atom, useSetAtom, useAtom } from "jotai"
import ActionButtonsEl from "./ActionButtonsEl"

export const shoppingListAtom = atom(null)


export default function ShoppingListPage() {
    const [shoppingList, setShoppingList] = useAtom(shoppingListAtom)
    const updateConfirmModal = useStore(state => state.updateConfirmModal)
    const generalListDocRef = doc(db, "shoppingList", "DhAnx7FUB4kZNnEgPRWS")
    
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
        const unsub = onSnapshot(docRef, snapshot => {
            //sync up with local state
            setShoppingList(snapshot.data())

        })

        return unsub
    }, [])
    
    return (
        <>
        <header className="py-2 px-4 grid grid-cols-9 font-bold text-lg fixed inset-x-0 top-0 bg-black/40 backdrop-blur">
            <h1 className="col-start-2 col-span-7 text-center">Shopping</h1>
            <HeaderMenu />
        </header>

        <main className="px-4 mt-12 flex flex-col gap-4">
            <ShoppingListEl />
            <AddItemCard onSubmit={AddItemToShoppingList}/>
            {
                !AddItemCardAtomOpen &&
                <Card className="grid fixed bottom-2 inset-x-0 mx-4 bg-black/40 backdrop-blur">
                    <Button 
                        className="bg-red-900 disabled:bg-red-900/50 disabled:text-white/50"
                        onClick={deleteSelectedItems}
                        disabled={!shoppingList?.items.some(item => item.selected === true)}
                    >
                        Delete checked
                    </Button>
                </Card>
            }
        </main>
        </>
    )
    
}