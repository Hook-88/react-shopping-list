import Menu from "./../../components/Menu/Menu"
import IconMore from "../../components/Icons/IconMore"
import { useAtomValue, useAtom } from "jotai"
import { formDataAtom, menuOpenAtom, shoppingListAtom, confirmDialogAtom } from "../../store/store"
import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../../firebase/firebase"
import MenuItemAddButton from "./MenuItemAddButton"

export default function MenuItemDeleteSelectionButton() {
    const selectedItems = useAtomValue(shoppingListAtom).filter(item => item.selected === true)
    const [dialogObj, setDialogObj] = useAtom(confirmDialogAtom) 
    
    function showDialogConfirm() {
        setDialogObj({
            question: "Delete checked items?",
            onConfirmCallbackFn: () => deleteSelectionsFromFirebase()
        })
    } 

    async function deleteItemFromFirebase(itemId) {
        const docRef = doc(db, "shoppingList", itemId)

        await deleteDoc(docRef)
    }

    function deleteSelectionsFromFirebase() {
        selectedItems.forEach(item => deleteItemFromFirebase(item.id))
    }

    
    return (
        <Menu.Item onClick={showDialogConfirm}>Delete selection</Menu.Item>
    )
}