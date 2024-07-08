import { useAtom } from "jotai"
import { listFiltersAtom } from "../../store/store"
import { FaCheck, FaEye, FaEyeSlash } from "react-icons/fa6"
import { useSetAtom } from "jotai"
import { confirmDialogAtom } from "../../store/store"
import { doc, deleteDoc } from "firebase/firestore"
import { db } from "../../firebase"
import useShoppingListItems from "../../hooks/useShoppingListItems"

export default function ListHeader({ingredients, selectAll}) {
    const [filter, setFilter] = useAtom(listFiltersAtom)
    const openConfirmDialog = useSetAtom(confirmDialogAtom)

    const numOfCheckedIngredients = ingredients?.filter(ingredient => ingredient.selected === true).length
    const allSelected = numOfCheckedIngredients === ingredients?.length

    function toggleFilterSelected() {
        if (filter) {
            setFilter(null)
            
            return
        }

        setFilter("!selected")
    }

    function handleClickToggleSelectAll() {
        selectAll(!allSelected)
    }
    
    return (
        <div className="flex items-center justify-between px-4 mb-1">
            {/* progress */}
            <small 
                // onClick={handleClick}
            >
                { `(${numOfCheckedIngredients}/${ingredients?.length})` }
                { allSelected && " All selected" }
            </small>

            {/* toggleSelectAll */}
            <button 
                className="flex items-center" 
                onClick={handleClickToggleSelectAll}

            >
                <small className="flex items-center gap-1">
                    {
                        allSelected ? "Deselect all" : "Select all"
                    }
                </small>
            </button>
        </div>

    )
}