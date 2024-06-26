import ShoppingListHeader from "./ShoppingListHeader"
import ShoppingListDefault from "./ShoppingListDefault"
import ShoppingListFilterNotSelected from "./ShoppingListFilterNotSelected"
import { useAtomValue } from "jotai"
import { listFiltersAtom } from "../../store/store"

export default function ShoppingListEl() {
    const filters = useAtomValue(listFiltersAtom)
    
    return (
        <div>
            <ShoppingListHeader />
            {
                filters.length > 0 ? <ShoppingListFilterNotSelected /> : <ShoppingListDefault />
            }
            
        </div>

    )
}