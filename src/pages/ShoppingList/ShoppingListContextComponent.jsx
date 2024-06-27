import { addDoc, collection, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore"
import { createContext, useEffect, useState } from "react"
import { db } from "../../firebase/firebase"

const ShoppingListContext = createContext()

export default function ShoppingListContextComponent({children}) {
    const [shoppingList, setShoppingList] = useState(null)
    const [popularItems, setPopularItems] = useState(null)

    useEffect(() => {
        const collectionRef = collection(db, "shoppingList/history/items")
        const unsub = onSnapshot(collectionRef, collectionSnapshot => {
            const arr = 
                collectionSnapshot.docs
                    .map(doc => ({ ...doc.data(), id: doc.id}))
                    .sort((a, b) => b.quantity - a.quantity)

            const uniqueArr = filterArrayByNames(arr, shoppingList === null ? [{}] : shoppingList)

            setPopularItems(uniqueArr.slice(0,5))
        })

        return unsub
    }, [shoppingList])

    function filterArrayByNames(sourceArray, referenceArray) {
        return sourceArray.filter(sourceObj => 
            !referenceArray.some(refObj => refObj.name === sourceObj.name)
        )
    }

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

    async function addItemToShoppingListInFirebase(itemName) {
        const collectionRef = collection(db, "shoppingList")
        const itemObj = {
            name: itemName,
            selected: false,
            quantity: 1
        }

        await addDoc(collectionRef, itemObj)
    }
    
    return (
        <ShoppingListContext.Provider 
            value={
                {
                    shoppingList, 
                    popularItems,
                    toggleItemSelectedInFirebase,
                    addItemToShoppingListInFirebase,
                }
            }
        >
            {children}
        </ShoppingListContext.Provider>
    )
}

export { ShoppingListContext }