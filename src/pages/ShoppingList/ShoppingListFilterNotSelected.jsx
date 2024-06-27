import { useAtomValue } from "jotai"
import { shoppingListAtom } from "../../store/store"
import ShoppingListItemDefault from "./ShoppingListItemDefault"
import ShoppingListItemSelected from "./ShoppingListItemSelected"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase/firebase"
import List from "../../components/List/List"

export default function ShoppingListFilterNotSelected() {
    const shoppingList = useAtomValue(shoppingListAtom)
    
    async function toggleSelectedInFirebase(docId) {
        const docRef = doc(db, "shoppingList", docId)
        const docSnap = await getDoc(docRef)

        await updateDoc(docRef, {selected: !docSnap.data().selected})

    }
    
    return (
        <List.ListDefault>
            {
                listArr => listArr
                    .filter(item => item.selected === false)
                    .map(item => (
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
            
        // <ul className="space-y-2">
        //     {
        //         shoppingList.filter(item => item.selected === false)
        //         .map(item => (
        //             <li key={item.id} onClick={() => toggleSelectedInFirebase(item.id)}>
        //                 {
        //                     item.selected ? 
        //                     <ShoppingListItemSelected item={item}/> :
        //                     <ShoppingListItemDefault item={item} />
        //                 }
        //             </li>
        //         ))
        //     }
        // </ul>
    )
}