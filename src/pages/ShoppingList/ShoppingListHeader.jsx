import { useAtomValue, useAtom } from "jotai"
import { listFiltersAtom, shoppingListAtom } from "../../store/store"
import { FaEye, FaEyeSlash } from "react-icons/fa6"

export default function ShoppingListHeader() {
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
        <div className="px-4 mb-1 flex">
            <small>(2/2)</small>
            <button 
                className="text-sm ml-auto flex items-center gap-1 disabled:text-white/50"
                disabled={!someChecked}
                onClick={toggleFilter}
            >
                {
                    filters.length > 0 ?
                    <>
                        show all
                        <FaEye />
                    </> :
                    <>
                        hide selected
                        <FaEyeSlash />
                    </>
                }
            </button>
        </div>
    )
}