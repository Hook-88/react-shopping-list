import Menu from "./../../components/Menu/Menu"
import IconMore from "../../components/Icons/IconMore"
import { useAtomValue, useSetAtom } from "jotai"
import { formDataAtom, menuOpenAtom, shoppingListAtom } from "../../store/store"
import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../../firebase/firebase"

export default function MenuItemAddButton() {
    const setFormData = useSetAtom(formDataAtom)

    function handleClickAddItem() {
        setFormData(true)
    }
    
    return (
        <Menu.Item onClick={handleClickAddItem}>Add item</Menu.Item>

    )
}