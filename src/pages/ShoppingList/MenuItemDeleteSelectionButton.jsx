import Menu from "./../../components/Menu/Menu"
import { useAtomValue, useSetAtom } from "jotai"
import { shoppingListAtom, confirmDialogAtom } from "../../store/store"
import { deleteDocFromFirebaseCollection } from "../../firebase/firebaseFn"

export default function MenuItemDeleteSelectionButton() {
    const selectedItems = useAtomValue(shoppingListAtom).filter(item => item.selected === true)
    const setDialogObj = useSetAtom(confirmDialogAtom) 
    
    function showDialogConfirm() {
        setDialogObj({
            question: "Delete checked items?",
            onConfirmCallbackFn: () => deleteSelectionsFromFirebase()
        })
    }

    function deleteSelectionsFromFirebase() {
        selectedItems.forEach(item => deleteDocFromFirebaseCollection("shoppingList", item.id))
    }

    
    return (
        <Menu.Item onClick={showDialogConfirm}>Delete selection</Menu.Item>
    )
}