import Card from "../../components/Card"
import getCapString from "../../utility/getCapString"
import ButtonAdd from "../../components/Buttons/ButtonAdd"
import ButtonSubtract from "../../components/Buttons/ButtonSubtract"

export default function ListItemCardDefault({item}) {
    
    return (
        <Card className="flex justify-between items-center">
            { getCapString(item.name) }
            &nbsp;
            { item.quantity > 1 && `(${item.quantity}x)` }
            <div className="flex gap-2">
                { item.quantity > 1 && <ButtonSubtract /> }
                <ButtonAdd />
            </div>
        </Card>
    )
}