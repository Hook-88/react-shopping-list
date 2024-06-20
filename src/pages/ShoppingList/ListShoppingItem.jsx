import List from "../../components/List/List"
import AddButton from "../../components/Buttons/AddButton"
import SubtractButton from "../../components/Buttons/SubtractButton"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase/firebase"

export default function ListShoppingItem({itemObj, collectionUrl, toggleChecked}) {

    async function modifyQuantity(num) {
        const docRef = doc(db, collectionUrl, itemObj.id)
        const docSnap = await getDoc(docRef)
        
        await updateDoc(docRef, {quantity: docSnap.data().quantity + num})
    }
    
    return (
        <List.Item onClick={() => toggleChecked(itemObj.id)}>
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
                    onClick={
                        (e) => {
                            e.stopPropagation()
                            modifyQuantity(-1)
                        }
                    }
                />
                <AddButton 
                    onClick={
                        (e) => {
                            e.stopPropagation()
                            modifyQuantity(1)
                        }
                    }
                />
            </div>
        </List.Item>
    )

}