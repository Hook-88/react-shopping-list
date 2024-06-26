import { useAtomValue, useAtom } from "jotai"
import { listFiltersAtom, shoppingListAtom } from "../../store/store"
import ButtonFilterShoppingList from "./ButtonFilterShoppingList"
import ShoppingListProgress from "./ShoppingListProgress"

export default function ShoppingListHeader() {
    const shoppingList = useAtomValue(shoppingListAtom)
    const shoppingListFilteredSelected = shoppingList.filter(item => item.selected === true)
    const [filters, setFilters] = useAtom(listFiltersAtom)

    
    return (
        <div className="px-4 mb-1 flex">
            <ShoppingListProgress />
            <ButtonFilterShoppingList />
        </div>
    )
}