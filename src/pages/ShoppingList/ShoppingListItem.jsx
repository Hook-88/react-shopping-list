import ItemDefault from "./ItemDefault"
import ItemChecked from "./ItemChecked"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase/firebase"
import { useStore } from "../../store/store"

export default function ShoppingListItem({itemId}) {
    const selected = useStore(state => state.shoppingList.find(item => item.id === itemId).selected)

    async function toggleChecked() {
        const docRef = doc(db, "shoppingList", itemId)
        const docSnap = await getDoc(docRef)

        updateDoc(docRef, { selected: !docSnap.data().selected })
    }

    return (
        <li onClick={toggleChecked}>
            {
                selected ? 
                <ItemChecked itemId={itemId}/> : 
                <ItemDefault itemId={itemId}/>
            }
        </li>
    )
}