import { useAtom } from "jotai"
import { listFiltersAtom } from "../../store/store"
import { FaEye, FaEyeSlash } from "react-icons/fa6"
import { useSetAtom } from "jotai"
import { confirmDialogAtom } from "../../store/store"
import { doc, deleteDoc } from "firebase/firestore"
import { db } from "../../firebase"
import useShoppingListItems from "../../hooks/useShoppingListItems"

export default function ListHeader() {
    const shoppingList = useShoppingListItems()
    const [filter, setFilter] = useAtom(listFiltersAtom)
    const openConfirmDialog = useSetAtom(confirmDialogAtom)

    const numOfCheckedItems = shoppingList?.filter(item => item.selected === true).length

    function toggleFilterSelected() {
        if (filter) {
            setFilter(null)
            
            return
        }

        setFilter("!selected")
    }

    function handleClick() {
        if (numOfCheckedItems === shoppingList?.length) {
            openConfirmDialog({
                question: "Remove checked items?",
                onConfirm: () => deleteCheckedItems()
            })
        }
        
    }

    function deleteCheckedItems() {
        const checkedItemArr = shoppingList.filter(item => item.selected === true)

        checkedItemArr.forEach(checkedItem => deleteFirebaseItem(checkedItem.id))
    }

    async function deleteFirebaseItem(docId) {
        const docRef = doc(db, "shoppingList", docId)

        await deleteDoc(docRef)
    }
    
    return (
        <div className="flex items-center justify-between px-4 mb-1">
            {/* progress */}
            <small onClick={handleClick}>
                {`(${numOfCheckedItems}/${shoppingList?.length})`}
                {numOfCheckedItems === shoppingList?.length && " Completed"}
            </small>

            {/* quickfilter */}
            <button 
                className="flex items-center disabled:text-white/50" 
                onClick={toggleFilterSelected}
                disabled={numOfCheckedItems === 0}

            >
                <small className="flex items-center gap-1">
                    {
                        filter ? 
                        <>
                            Show selected
                            <FaEye />
                        </> :
                        <>
                            Hide selected
                            <FaEyeSlash />
                        </>
                    }
                </small>
            </button>
        </div>

    )
}