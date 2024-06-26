import Menu from "./../../components/Menu/Menu"
import IconMore from "../../components/Icons/IconMore"
import { useAtomValue, useSetAtom } from "jotai"
import { formDataAtom, menuOpenAtom, shoppingListAtom } from "../../store/store"
import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../../firebase/firebase"
import MenuItemAddButton from "./MenuItemAddButton"

export default function MenuItemDeleteSelectionButton() {
    const selectedItems = useAtomValue(shoppingListAtom).filter(item => item.selected === true) 

    async function deleteItemFromFirebase(itemId) {
        const docRef = doc(db, "shoppingList", itemId)

        await deleteDoc(docRef)
    }

    function deleteSelectionsFromFirebase() {
        selectedItems.forEach(item => deleteItemFromFirebase(item.id))
    }

    
    return (
        <Menu.Item onClick={deleteSelectionsFromFirebase}>Delete selection</Menu.Item>
    )
}