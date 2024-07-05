import { useAtom, useAtomValue } from "jotai"
import { listFiltersAtom, shoppingListAtom } from "../../store/store"
import { FaEye, FaEyeSlash } from "react-icons/fa6"

export default function ListHeader() {
    const shoppingList = useAtomValue(shoppingListAtom)
    const [filter, setFilter] = useAtom(listFiltersAtom)
    const numOfCheckedItems = shoppingList.filter(item => item.selected === true).length

    function toggleFilterSelected() {
        if (filter) {
            setFilter(null)
            
            return
        }

        setFilter("!selected")
    }
    
    return (
        <div className="flex items-center justify-between px-4 mb-1">
            {/* progress */}
            <small>
                {`(${numOfCheckedItems}/${shoppingList.length})`}
                {numOfCheckedItems === shoppingList.length && " Completed"}
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