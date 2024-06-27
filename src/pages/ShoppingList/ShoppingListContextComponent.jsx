import { collection, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore"
import { createContext, useEffect, useState } from "react"
import { db } from "../../firebase/firebase"

const ShoppingListContext = createContext()

export default function ShoppingListContextComponent({children}) {
    const [shoppingList, setShoppingList] = useState(null)

    useEffect(() => {
        const collectionRef = collection(db, "shoppingList")
        const unsub = onSnapshot(collectionRef, collectionSnapshot => {
            const arr = 
                collectionSnapshot.docs
                    .filter(doc => doc.id !== "history")
                    .map(doc => ({ ...doc.data(), id: doc.id}))

            setShoppingList(arr)
        })

        return unsub
    }, [])

    async function toggleItemSelectedInFirebase(itemId) {
        const docRef = doc(db, "shoppingList", itemId)
        const docSnap = await getDoc(docRef)

        await updateDoc(docRef, { selected: !docSnap.data().selected})
    }
    
    return (
        <ShoppingListContext.Provider 
            value={
                {
                    shoppingList, 
                    toggleItemSelectedInFirebase
                }
            }
        >
            {children}
        </ShoppingListContext.Provider>
    )
}

export { ShoppingListContext }