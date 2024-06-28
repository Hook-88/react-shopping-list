import { useContext } from "react"
import Card from "../../components/Card"
import { ShoppingListContext } from "./ShoppingListContextComponent"
import getCapString from "./../../utility/getCapString"
import { FormContext } from "../../Context/FormContextComponent"

export default function ListInlinePopularItems() {
    const { popularItems, addItemToShoppingListInFirebase } = useContext(ShoppingListContext)
    const {openForm} = useContext(FormContext)

    function handleClick(itemName) {
        openForm()
        addItemToShoppingListInFirebase(itemName)
    }
    
    return (
        popularItems ? 
        <ul className="flex flex-wrap-reverse gap-2 mb-3">
            {
                popularItems.map(item => (
                    <li 
                        key={item.id} 
                        className="flex-grow"
                        onClick={() => handleClick(item.name)}
                    >
                        <Card className="text-center">
                            {getCapString(item.name)}
                        </Card>
                    </li>
                ))
            }
        </ul> : null
    )
}