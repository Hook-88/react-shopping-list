import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { confirmDialogAtom, pageFormsOpenAtom, shoppingListAtom } from "../../store/store"
import { FaEllipsis, FaMinus, FaPlus } from "react-icons/fa6"
import Menu from "../../components/Menu/Menu"
import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../../firebase"

export default function MenuShoppingListPage() {
    const shoppingList = useAtomValue(shoppingListAtom)
    const openForm = useSetAtom(pageFormsOpenAtom)
    const openConfirmDialog = useSetAtom(confirmDialogAtom)

    function handleClickAdd() {
        openForm(true)
    }

    function deleteCheckedItems() {
        const checkedItemArr = shoppingList.filter(item => item.selected === true)

        checkedItemArr.forEach(checkedItem => deleteFirebaseItem(checkedItem.id))
    }

    function handleClickClear() {
        openConfirmDialog({
            question: "Remove checked items?",
            onConfirm: () => deleteCheckedItems()
        })
    }

    async function deleteFirebaseItem(docId) {
        const docRef = doc(db, "shoppingList", docId)

        await deleteDoc(docRef)
    }

    return (
        <Menu className="flex items-center">
            <Menu.Button className="w-full h-full flex items-center justify-end">
                <span className="p-1 border border-transparent">
                    <FaEllipsis />
                </span>
            </Menu.Button>
            <Menu.Dropdown>
                <Menu.Item 
                    className="px-4 py-1 border-b border-white/10 text-nowrap"
                    onClick={handleClickAdd}
                >
                    Add Item
                </Menu.Item>
                <Menu.Item 
                    className="px-4 py-1 text-nowrap"
                    onClick={handleClickClear}
                >
                    Clear List
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}