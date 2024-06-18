import List from "../components/List/List"
import IconCheck from "../components/Icons/IconCheck"
import AddButton from "../components/Buttons/AddButton"
import SubtractButton from "../components/Buttons/SubtractButton"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase/firebase"

export default function ShoppingListListItem({itemObj}) {
    const docRef = doc(db, `shoppingList/${itemObj.listId}/items`, itemObj.id)

    async function toggleChecked() {
        const docSnap = await getDoc(docRef)

        await updateDoc(docRef, { selected: !docSnap.data().selected })
    }

    async function modifyQuantity(num) {
        const docSnap = await getDoc(docRef)

        await updateDoc(docRef, { quantity: docSnap.data().quantity + num })
    }

    
    return (
        itemObj.selected ? 
        <List.Item className="bg-green-900" onClick={toggleChecked}>
            {itemObj.name}
            {
                itemObj.quantity > 1 &&
                <>
                    &nbsp;
                    {`(${itemObj.quantity}x)`}
                </>
            }
            <IconCheck className="p-1 ml-auto border border-white/0"/>
        </List.Item> :

        <List.Item onClick={toggleChecked}>
            {itemObj.name}
            {
                itemObj.quantity > 1 &&
                <>
                    &nbsp;
                    {`(${itemObj.quantity}x)`}
                </>
            }
            <div className="ml-auto flex gap-2">
                <SubtractButton 
                    onClick={e => {
                        e.stopPropagation()
                        modifyQuantity(-1)
                    }}
                />
                <AddButton 
                    onClick={e => {
                        e.stopPropagation()
                        modifyQuantity(1)
                    }}
                />
            </div>
        </List.Item>

    )
}