import Card from "../../components/Card"
import ButtonAdd from "../../components/Buttons/ButtonAdd"
import ButtonSubtract from "../../components/Buttons/ButtonSubtract"

export default function ShoppingListItemDefault({item}) {
    
    return ( 
        <Card className="flex items-center justify-between">
            {item.name}
            &nbsp;
            {   
                item.quantity > 1 &&
                `(${item.quantity}x)`
            }
            <div className="flex gap-2">
                {
                    item.quantity > 1 && <ButtonSubtract />
                }
                <ButtonAdd />
            </div>
        </Card>
    )
}