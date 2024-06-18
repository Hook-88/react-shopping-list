import List from "../components/List/List"
import IconCheck from "../components/Icons/IconCheck"

export default function ShoppingListListItemChecked({itemObj, onClick}) {
    
    return (
        <List.Item className="bg-green-900 justify-between" onClick={onClick}>
            {itemObj.name}
            {
                itemObj.quantity > 1 &&
                <>
                    &nbsp;
                    {`(${itemObj.quantity}x)`}
                </>
            }
            <IconCheck className="p-1 border border-white/0"/>
        </List.Item>
    )
}