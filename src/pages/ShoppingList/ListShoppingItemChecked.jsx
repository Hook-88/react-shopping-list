import List from "../../components/List/List"
import IconCheck from "../../components/Icons/IconCheck"
import AddButton from "../../components/Buttons/AddButton"
import SubtractButton from "../../components/Buttons/SubtractButton"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase/firebase"

export default function ListShoppingItemChecked({itemObj, collectionUrl, toggleChecked}) {
    
    return (
        <List.Item className="bg-green-900" onClick={() => toggleChecked(itemObj.id)}>
            {itemObj.name}
            {
                itemObj.quantity > 1 &&
                <>
                    &nbsp;
                    {`(${itemObj.quantity}x)`}
                </>
            }
            
            <IconCheck className="ml-auto p-1 border border-transparent"/>
        </List.Item>
    )

}