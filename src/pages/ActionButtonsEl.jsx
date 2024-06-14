import Card from "../components/Card"
import { FaCheck } from "react-icons/fa6"
import { atom, useAtomValue } from "jotai"
import { addItemAtom } from "./AddItemForm"
import { shoppingListAtom } from "./ShoppingListPage"
import { useStore } from "../store/store"
import { updateDoc, doc } from "firebase/firestore"
import { db } from "../firebase/firebase"


export const ActionButtonsElAtom = atom(get => {
    const addItem = get(addItemAtom)
    const shoppingList = get(shoppingListAtom)

    return shoppingList?.items.some(item => item.selected === true) && !addItem
    
})

export default function ActionButtonsEl() {
    const generalListDocRef = doc(db, "shoppingList", "DhAnx7FUB4kZNnEgPRWS")
    const open = useAtomValue(ActionButtonsElAtom)
    const updateConfirmModal = useStore(state => state.updateConfirmModal)
    const shoppingList = useAtomValue(shoppingListAtom)

    function showModal() {
        updateConfirmModal({
            confirmQuestion: "Are you sure",
            onConfirm: deleteSelected
        })
    }

    async function deleteSelected() {
        const newListArray = shoppingList.items.filter(item => item.selected === false)
        
        await updateDoc(generalListDocRef, {items: newListArray})
    }

    async function sortListOnSelected() {
        const sortedList = [...shoppingList.items].sort((a, b) => a.selected - b.selected)

        await updateDoc(generalListDocRef, {items: sortedList})
    }
    
    return (
        open ?
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

        </Card> : null
    )
}



