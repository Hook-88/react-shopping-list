import { useAtomValue, useSetAtom } from "jotai"
import { shoppingListAtom, confirmDialogAtom } from "../../store/store"
import List from "../../components/List/List"
import ButtonFilterShoppingList from "./ButtonFilterShoppingList"
import { deleteDocFromFirebaseCollection } from "../../firebase/firebaseFn"


export default function ShoppingListHeader() {
    const shoppingList = useAtomValue(shoppingListAtom)

    const setDialogObj = useSetAtom(confirmDialogAtom) 
    
    function showDialogConfirm() {
        setDialogObj({
            question: "Delete checked items?",
            onConfirmCallbackFn: () => deleteSelectionsFromFirebase()
        })
    } 

    function deleteSelectionsFromFirebase() {
        shoppingList.filter(item => item.selected === true)
            .forEach(item => deleteDocFromFirebaseCollection("shoppingList", item.id))
    }
    
    return (
        <List.Header>
            <List.Progress onClick={showDialogConfirm}/>
            <ButtonFilterShoppingList />
        </List.Header>
    )
}