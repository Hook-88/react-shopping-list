import { useAtomValue } from "jotai"
import { shoppingListAtom } from "../../store/store"
import Card from "../../components/Card"
import ButtonAdd from "../../components/Buttons/ButtonAdd"
import ButtonSubtract from "../../components/Buttons/ButtonSubtract"
import ShoppingListItemDefault from "./ShoppingListItemDefault"

export default function ShoppingListDefault() {
    const shoppingList = useAtomValue(shoppingListAtom)  
    
    return (
        <ul className="space-y-2">
            {
                shoppingList.map(
                    item => (
                        <ShoppingListItemDefault 
                            key={item.id}
                            item={item}
                        />   
                    )
                )
            }
        </ul>
    )
}