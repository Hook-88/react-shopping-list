import { useAtomValue } from "jotai"
import { shoppingListAtom } from "../../store/store"
import ItemDefault from "./ItemDefault"
import ItemChecked from "./ItemChecked"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase/firebase"

export default function ShoppingListItem({itemId}) {
    const shoppingList = useAtomValue(shoppingListAtom)
    const item = shoppingList.filter(item => item.id === itemId)[0]

    async function toggleChecked() {
        const docRef = doc(db, "shoppingList", item.id)
        const docSnap = await getDoc(docRef)

        updateDoc(docRef, { selected: !docSnap.data().selected })
    }

    return (
        <li onClick={toggleChecked}>
            {
                item.selected ? 
                <ItemChecked itemObj={item}/> : 
                <ItemDefault itemObj={item}/>
            }
        </li>
    )
}