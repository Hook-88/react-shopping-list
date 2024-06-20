import List from "../components/List/List"
import IconCheck from "../components/Icons/IconCheck"
import AddButton from "../components/Buttons/AddButton"
import SubtractButton from "../components/Buttons/SubtractButton"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase/firebase"
import { useState } from "react"

export default function ShoppingListListItemEdit({itemObj}) {
    const docRef = doc(db, `shoppingList/${itemObj.listId}/items`, itemObj.id)
    const [selectForEdit, setSelectForEdit]= useState(false)

    function toggleSelectForEdit() {
        setSelectForEdit(prev => !prev)
    }
    
    return (
        selectForEdit ?
        <List.Item 
            className="bg-blue-900"
            onClick={toggleSelectForEdit}
        
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
        <List.Item onClick={toggleSelectForEdit}>
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