import { collection, onSnapshot } from "firebase/firestore"
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
    
    return (
        <ShoppingListContext.Provider value={{shoppingList}}>
            {children}
        </ShoppingListContext.Provider>
    )
}

export { ShoppingListContext }