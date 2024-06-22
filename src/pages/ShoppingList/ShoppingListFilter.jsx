import List from "../../components/List/List"
import ShoppingListItem from "./ShoppingListItem"
import { useStore } from "../../store/store"

export default function ShoppingListFilter() {
    const items = useStore(state => state.shoppingList.filter(item => item.selected === false))
    
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