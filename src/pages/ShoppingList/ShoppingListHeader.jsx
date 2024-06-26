import { useAtomValue } from "jotai"
import { shoppingListAtom } from "../../store/store"
import { FaEyeSlash } from "react-icons/fa6"

export default function ShoppingListHeader() {
    
    return (
        <div className="px-4 mb-1 flex">
            <small>(2/2)</small>
            <button className="text-sm ml-auto flex items-center gap-1">
                <FaEyeSlash />
                hide selected
            </button>
        </div>
    )
}