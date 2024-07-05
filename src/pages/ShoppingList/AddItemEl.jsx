import { useAtomValue } from "jotai"
import { shoppingListAtom } from "../../store/store"
import getStringFirstCharCap from "../../utility/getStringFirstCharCap"
import { FaMinus, FaPlus } from "react-icons/fa6"
import ListShoppingListEl from "./ListShoppingListEl"

export default function AddItemEl() {
    const shoppingList = useAtomValue(shoppingListAtom)
    
    return (
        <div className="bg-white/10 p-2 rounded-md">
            <form className="grid gap-2">
                <input 
                    type="text" 
                    className="py-1 px-2 rounded-md bg-white/10"
                    placeholder="item..."
                />
                <div className="flex gap-2">
                    <button 
                        className="flex-grow py-1 bg-green-900 rounded-md border border-white/10"
                    >
                        Add
                    </button>
                    <button 
                        className="px-2 bg-red-900 rounded-md border border-white/10" 
                        type="button"
                    >
                        Close
                    </button>
                </div>
            </form>
        </div>
    )
}