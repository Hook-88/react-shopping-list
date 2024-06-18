import List from "../components/List/List"
import SubtractButton from "../components/Buttons/SubtractButton"
import AddButton from "../components/Buttons/AddButton"
import ShoppingListListItemChecked from "./ShoppingListListItemChecked"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase/firebase"

export default function ShoppingListListItem({itemObj, onClick}) {
    const docRef = doc(db, `shoppingList/${itemObj.listId}/items`, itemObj.id)

    async function modifyQuantity(num) {
        const docSnap = await getDoc(docRef)
        updateDoc(docRef, {quantity : docSnap.data().quantity + num})
    }

    return (
        <List.Item onClick={onClick}>
            {itemObj.name}
            {
                itemObj.quantity > 1 &&
                <>
                    &nbsp;
                    {`(${itemObj.quantity}x)`}
                </>
            }
            
            <div className="ml-auto flex gap-2">
                {
                    itemObj.quantity > 1 &&
                    <SubtractButton onClick={e => {
                        e.stopPropagation()
                        modifyQuantity(-1)
                    }}/>
                }

                <AddButton onClick={e => {
                    e.stopPropagation()
                    modifyQuantity(1)
                }}/>
            </div>
        </List.Item>
    )
}

ShoppingListListItem.Checked = ShoppingListListItemChecked