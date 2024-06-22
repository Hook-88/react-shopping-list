import Menu from "../../components/Menu/Menu"
import { useStore } from "../../store/store"
import { useSetAtom } from "jotai"
import { menuOpenAtom } from "../../store/store"
import { doc, deleteDoc } from "firebase/firestore"
import { db } from "../../firebase/firebase"

export default function MenuItemDeleteItems() {
    const items = useStore(state => state.shoppingList)
    const setOpenMenu = useSetAtom(menuOpenAtom)

    function handleClickDeleteCheckedItems() {
        deleteItemsChecked()
        setOpenMenu(false)
    }

    function deleteItemsChecked() {
        const itemsChecked = items.filter(item => item.selected === true)

        itemsChecked.forEach(item => deleteItem(item.id))
    }

    async function deleteItem(itemId) {
        const docRef = doc(db, "shoppingList", itemId)
        
        await deleteDoc(docRef)
    }


    return (
        <Menu.Item onClick={handleClickDeleteCheckedItems}>Delete checked items</Menu.Item>
    )
}