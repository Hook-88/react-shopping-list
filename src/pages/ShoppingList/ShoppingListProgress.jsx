import { useStore } from "../../store/store"
import ListProgress from "../../components/List/ListProgress"

export default function ShoppingListProgress() {
    const items = useStore(state => state.shoppingList)
    const itemsChecked = items.filter(item => item.selected === false)
    
    return (
        <ListProgress 
            totalLength={items.length}
            currentLength={itemsChecked.length}
        />
    )
}