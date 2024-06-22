import { useStore } from "../../store/store"
import ShoppingListDefault from "./ShoppingListDefault"
import ShoppingListFilter from "./ShoppingListFilter"
import ListHeader from "./ListHeader"


export default function ShoppingList() {
    const items = useStore(state => state.shoppingList)
    const filters = useStore(state => state.filters)
    
    return (
        items.length > 0 ?
        <div className="flex flex-col gap-1">
            <ListHeader />
            {
                filters.some(filter => filter === "selected") ? 
                <ShoppingListFilter /> :
                <ShoppingListDefault />
            }
        </div> : null
    )
}