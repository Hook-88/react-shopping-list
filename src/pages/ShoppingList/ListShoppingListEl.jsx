import { useAtomValue } from "jotai"
import { shoppingListAtom } from "../../store/store"
import ListItemDefault from "./ListItemDefault"
import ListItemSelected from "./ListItemSelected"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase"

export default function ListShoppingListEl() {
    const shoppingList = useAtomValue(shoppingListAtom)

    async function toggleFirebaseItemSelect(itemId) {
        const docRef = doc(db, "shoppingList", itemId)
        const docSnap = await getDoc(docRef)

        await updateDoc(docRef, {selected: !docSnap.data().selected})
    }
    
    return (
        <>
            <div className="flex items-center justify-between px-4 mb-1">
                <small>(4/4)</small>
                <button className="flex items-center">
                    <small>Hide selected</small>
                </button>
            </div>
            <ul>
                {
                    shoppingList.map(item => (
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
        </>

    )
}