import List from "../../components/List/List"
import IconCheck from "../../components/Icons/IconCheck"
import AddButton from "../../components/Buttons/AddButton"
import SubtractButton from "../../components/Buttons/SubtractButton"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase/firebase"
import { useContext, useState } from "react"
import { ListEditContext } from "./ListEdit"

export default function ShoppingListListItemEdit({itemObj}) {
    const docRef = doc(db, `shoppingList/${itemObj.listId}/items`, itemObj.id)
    const { selectItem } = useContext(ListEditContext)

    function handleClick() {
        // setSelectForEdit(prev => !prev)
        selectItem(itemObj.id)
    }
    
    return (
        itemObj.selectForEdit ?
        <List.Item 
            className="bg-blue-900"
            onClick={handleClick}
        
        >
            {itemObj.name}
            {
                itemObj.quantity > 1 &&
                <>
                    &nbsp;
                    {`(${itemObj.quantity}x)`}
                </>
            }
            <IconCheck className="p-1 border border-transparent text-transparent"/>
        </List.Item> : 
        <List.Item onClick={handleClick}>
            {itemObj.name}
            {
                itemObj.quantity > 1 &&
                <>
                    &nbsp;
                    {`(${itemObj.quantity}x)`}
                </>
            }
            <IconCheck className="p-1 border border-transparent text-transparent"/>
        </List.Item>

    )
}

// TODO add click handler to select item