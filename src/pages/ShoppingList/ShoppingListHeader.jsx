import ShoppingListHeader from "./ShoppingListHeader"
import ShoppingListDefault from "./ShoppingListDefault"
import ShoppingListFilterNotSelected from "./ShoppingListFilterNotSelected"
import { useAtomValue } from "jotai"
import { listFiltersAtom, shoppingListAtom } from "../../store/store"
import List from "../../components/List/List"
import ButtonFilterShoppingList from "./ButtonFilterShoppingList"

export default function ShoppingListEl() {
    const shoppingList = useAtomValue(shoppingListAtom)
    const filters = useAtomValue(listFiltersAtom)
    
    return (
        <List.Header>
            <List.Progress />
            <ButtonFilterShoppingList />
        </List.Header>
    )
}