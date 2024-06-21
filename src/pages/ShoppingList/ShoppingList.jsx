import List from "../../components/List/List"
import { useAtomValue } from "jotai"
import { shoppingListAtom } from "../../store/store"
import ShoppingListItem from "./ShoppingListItem"

export default function ShoppingList() {
    const items = useAtomValue(shoppingListAtom)
    
    return (
        items.length > 0 ?
        <List>
            {
                items.map(item => (
                    <ShoppingListItem key={item.id} itemId={item.id}/>
                ))
            }
        </List> : null
    )
}