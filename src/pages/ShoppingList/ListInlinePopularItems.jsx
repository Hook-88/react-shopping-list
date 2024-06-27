import { useContext } from "react"
import Card from "../../components/Card"
import { ShoppingListContext } from "./ShoppingListContextComponent"
import getCapString from "./../../utility/getCapString"

export default function ListInlinePopularItems() {
    const { popularItems } = useContext(ShoppingListContext)
    
    return (
        popularItems ? 
        <ul className="flex flex-wrap-reverse gap-2 mb-3">
            {
                popularItems.map(item => (
                    <li key={item.id} className="flex-grow">
                        <Card className="text-center">
                            {getCapString(item.name)}
                        </Card>
                    </li>
                ))
            }
        </ul> : null
    )
}