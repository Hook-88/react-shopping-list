import { useContext } from "react"
import { ListContext } from "./List"
import { doc, updateDoc, getDoc } from "firebase/firestore"
import { db } from "../../firebase/firebase"

export default function ListListDefault({children}) {
    const { listArr } = useContext(ListContext)

    async function toggleSelectedInFirebase(docId) {
        const docRef = doc(db, "shoppingList", docId)
        const docSnap = await getDoc(docRef)

        await updateDoc(docRef, {selected: !docSnap.data().selected})

    }
    
    return (    
        <ul className="space-y-2">
            {
                // listArr.map(item => (
                //     <li key={item.id} onClick={() => toggleSelectedInFirebase(item.id)}>
                //         {
                //             item.selected ? 
                //             <ShoppingListItemSelected item={item}/> :
                //             <ShoppingListItemDefault item={item} />
                //         }
                //     </li>
                // ))
                children(listArr)
            }
        </ul>
    )
}