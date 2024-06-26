import PageHeader from "../../components/PageHeader/PageHeader"
import ShoppingListEl from "./ShoppingListEl"
import Menu from "./../../components/Menu/Menu"
import IconMore from "../../components/Icons/IconMore"
import { useAtomValue, useSetAtom } from "jotai"
import { formDataAtom, menuOpenAtom, shoppingListAtom } from "../../store/store"
import { collection, deleteDoc, doc } from "firebase/firestore"
import { db } from "../../firebase/firebase"

export default function ShoppingListMenu() {
    const setOpen = useSetAtom(menuOpenAtom)
    const setFormData = useSetAtom(formDataAtom)
    const selectedItems = useAtomValue(shoppingListAtom).filter(item => item.selected === true) 

    function toggleOpen() {
        setOpen(prev => !prev)
    }

    function handleClickAddItem() {
        setFormData(true)
    }

    async function deleteItemFromFirebase(itemId) {
        const docRef = doc(db, "shoppingList", itemId)

        await deleteDoc(docRef)
    }

    function deleteSelectionsFromFirebase() {
        selectedItems.forEach(item => deleteItemFromFirebase(item.id))
    }

    
    return (
        <Menu className="col-span-2">
            <Menu.Button className="flex justify-end items-center pr-5"><IconMore /></Menu.Button>
            <Menu.Dropdown onClick={toggleOpen}>
                <Menu.Item onClick={handleClickAddItem}>Add item</Menu.Item>
                <Menu.Item onClick={deleteSelectionsFromFirebase}>Delete selected</Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}