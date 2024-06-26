import ShoppingListHeader from "./ShoppingListHeader"
import ShoppingListDefault from "./ShoppingListDefault"
import ShoppingListFilterNotSelected from "./ShoppingListFilterNotSelected"
import { useAtomValue } from "jotai"
import { listFiltersAtom, shoppingListAtom } from "../../store/store"
import List from "../../components/List/List"

export default function ShoppingListEl() {
    const shoppingList = useAtomValue(shoppingListAtom)
    const filters = useAtomValue(listFiltersAtom)
    
    return (
        <List listArr={shoppingList}>
            <ShoppingListHeader />
            {
                filters.length > 0 ? 
                    <ShoppingListFilterNotSelected /> : <ShoppingListDefault />
            }
        </List>

    )
}