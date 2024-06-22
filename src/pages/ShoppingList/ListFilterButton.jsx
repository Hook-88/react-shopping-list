import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"
import { useStore } from "../../store/store"

export default function ListFilterButton() {
    const hasCheckedItems = !useStore(state => state.shoppingList.some(item => item.selected === true))
    const filters = useStore(state => state.filters)
    const addFilter = useStore(state => state.addFilter)
    const removeFilter = useStore(state => state.removeFilter)

    function handleClickFilterSelected() {
        if (filters.some(filter => filter === "selected")) {
            removeFilter("selected")
        } else {
            addFilter("selected")
        }
    }

    return (
        <button 
            className="col-start-4 flex justify-end items-center mr-5 col-span-3 text-sm disabled:text-white/30"
            onClick={handleClickFilterSelected}
            disabled={hasCheckedItems}
        >
            {
                filters.some(filter => filter === "selected") ?
                
                <>
                    {"Show checked"}
                    &nbsp;
                    <FaRegEye /> 
                </> :
                <>
                    {"Hide checked"}
                    &nbsp; 
                    <FaRegEyeSlash />
                </> 
            }
        </button>
    )
}