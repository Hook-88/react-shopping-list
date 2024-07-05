import { useAtomValue } from "jotai"
import { shoppingListAtom } from "../../store/store"
import ListItemDefault from "./ListItemDefault"
import ListItemSelected from "./ListItemSelected"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase"

export default function ListFilterNotSelected() {
    const shoppingList = useAtomValue(shoppingListAtom)

    async function toggleFirebaseItemSelect(itemId) {
        const docRef = doc(db, "shoppingList", itemId)
        const docSnap = await getDoc(docRef)

        await updateDoc(docRef, {selected: !docSnap.data().selected})
    }
    
    return (
        <ul>
            {
                shoppingList
                    .filter(item => item.selected === false)
                    .map(item => (
                        <li key={item.id} onClick={() => toggleFirebaseItemSelect(item.id)}>
                            {
                                item.selected ? 
                                    <ListItemSelected key={item.id} item={item}/> : 
                                    <ListItemDefault key={item.id} item={item}/>
                            }
                        </li>
                    ))
            }
        </ul>
    )
}