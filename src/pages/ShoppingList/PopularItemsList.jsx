import ShoppingListHeader from "./ShoppingListHeader"
import ShoppingListDefault from "./ShoppingListDefault"
import ShoppingListFilterNotSelected from "./ShoppingListFilterNotSelected"
import { useAtomValue, useSetAtom } from "jotai"
import { listFiltersAtom, shoppingListAtom, confirmDialogAtom } from "../../store/store"
import List from "../../components/List/List"

export default function PopularItemsList() {
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