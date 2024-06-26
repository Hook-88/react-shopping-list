import { useAtomValue, useAtom } from "jotai"
import { listFiltersAtom, shoppingListAtom } from "../../store/store"
import { FaEye, FaEyeSlash } from "react-icons/fa6"

export default function ButtonFilterShoppingList() {
    const someChecked = useAtomValue(shoppingListAtom).some(item => item.selected === true)
    const [filters, setFilters] = useAtom(listFiltersAtom)

    function toggleFilter() {
        const filterApply = filters.some(filter => filter === "selected")
        
        if (filterApply) {
            removeSelectedFilter()

            return
        }

        addSelectedFilter()
    }
    
    function addSelectedFilter() {
        setFilters(['selected'])
    }

    function removeSelectedFilter() {
        setFilters([])
    }
    
    return (
        <button 
            className="ml-auto disabled:text-white/50"
            disabled={!someChecked}
            onClick={toggleFilter}
        >
            {
                filters.length > 0 ?
                <small className="flex items-center gap-1"> 
                    Show all
                    <FaEye />
                </small> :
                <small className="flex items-center gap-1">
                    Hide selected
                    <FaEyeSlash />
                </small>
            }
        </button>
    )
}