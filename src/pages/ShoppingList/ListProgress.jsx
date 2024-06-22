import { useStore } from "../../store/store"

export default function ListProgress() {
    const items = useStore(state => state.shoppingList)
    const ItemsChecked = items.filter(item => item.selected === false)
    
    return (
        <small className="ml-4">
            {`(${ItemsChecked.length}/${items.length})`}
        </small>
    )
}