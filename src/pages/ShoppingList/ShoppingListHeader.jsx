import { useAtomValue } from "jotai"
import { shoppingListAtom } from "../../store/store"
import { FaEyeSlash } from "react-icons/fa6"

export default function ShoppingListHeader() {
    const someChecked = useAtomValue(shoppingListAtom).some(item => item.selected === true)
    
    return (
        <div className="px-4 mb-1 flex">
            <small>(2/2)</small>
            <button 
                className="text-sm ml-auto flex items-center gap-1 disabled:text-white/50"
                disabled={!someChecked}
            >
                <FaEyeSlash />
                hide selected
            </button>
        </div>
    )
}