import ButtonFilterShoppingList from "./ButtonFilterShoppingList"
import ShoppingListProgress from "./ShoppingListProgress"

export default function ShoppingListHeader() {
    
    return (
        <div className="px-4 mb-1 flex">
            <ShoppingListProgress />
            <ButtonFilterShoppingList />
        </div>
    )
}