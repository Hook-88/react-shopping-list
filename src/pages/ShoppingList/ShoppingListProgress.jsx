import { useAtomValue, useAtom } from "jotai"
import { listFiltersAtom, shoppingListAtom } from "../../store/store"

export default function ShoppingListProgress() {
    const shoppingList = useAtomValue(shoppingListAtom)
    const shoppingListFilteredSelected = shoppingList.filter(item => item.selected === true)

    
    return (
        <small>
            {`(${shoppingListFilteredSelected.length}/${shoppingList.length})`}
        </small>
    )
}