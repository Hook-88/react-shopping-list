import List from "../../components/List/List"
import ShoppingListItem from "./ShoppingListItem"
import { useStore } from "../../store/store"

export default function ShoppingListDefault() {
    const items = useStore(state => state.shoppingList)
    
    return (
        <List>
            {
                items.map(item => (
                    <ShoppingListItem key={item.id} itemId={item.id}/>
                ))
            }
        </List> 
    )
}