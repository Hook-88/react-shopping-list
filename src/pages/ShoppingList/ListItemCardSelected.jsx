import Card from "../../components/Card"
import getCapString from "../../utility/getCapString"
import IconCheck from "../../components/Icons/IconCheck"

export default function ListItemCardSelected({item}) {
    
    return (
        <Card className="flex justify-between items-center bg-green-900">
            { getCapString(item.name) }
            &nbsp;
            { item.quantity > 1 && `(${item.quantity}x)` }
            <IconCheck className="p-1 border border-transparent"/>
        </Card>
    )
}