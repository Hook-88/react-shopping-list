import ShoppingListItemDefault from "./ShoppingListItemDefault"
import ShoppingListItemSelected from "./ShoppingListItemSelected"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase/firebase"
import List from "../../components/List/List"

export default function ShoppingListDefault() {
    
    async function toggleSelectedInFirebase(docId) {
        const docRef = doc(db, "shoppingList", docId)
        const docSnap = await getDoc(docRef)

        await updateDoc(docRef, {selected: !docSnap.data().selected})

    }
    
    return (    
        <List.ListDefault>
            {
                listArr => listArr.map(item => (
                    <li key={item.id} onClick={() => toggleSelectedInFirebase(item.id)}>
                        {
                            item.selected ? 
                            <ShoppingListItemSelected item={item}/> :
                            <ShoppingListItemDefault item={item} />
                        }
                    </li>
                ))
            }
        </List.ListDefault>
    )
}