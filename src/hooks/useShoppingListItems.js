import { useState, useEffect } from "react"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../firebase"

export default function useShoppingListItems() {
    const [shoppingListItems, setShoppingListItems] = useState(null)

    useEffect(() => {
        const collectionRef = collection(db, "shoppingList")
        const unsub = onSnapshot(collectionRef, snapshot => {
            const arr = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}))

            setShoppingListItems(arr)
        })

        return unsub
    }, [])

    return shoppingListItems
}