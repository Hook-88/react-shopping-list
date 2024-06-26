import Card from "../../components/Card"
import IconCheck from "../../components/Icons/IconCheck"
import ButtonAdd from "../../components/Buttons/ButtonAdd"
import ButtonSubtract from "../../components/Buttons/ButtonSubtract"

export default function ShoppingListItemSelected({item}) {
    
    return (
        <Card className="flex items-center justify-between bg-green-900">
            {item.name}
            &nbsp;
            {   
                item.quantity > 1 &&
                `(${item.quantity}x)`
            }
            <IconCheck className="p-1 border border-transparent"/>
        </Card>
    )
}