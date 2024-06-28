import { addDoc, collection, doc, getDoc, onSnapshot, updateDoc, query, where, getDocs, deleteDoc } from "firebase/firestore"
import { createContext, useEffect, useState } from "react"
import { db } from "../../firebase/firebase"

const ShoppingListContext = createContext()

export default function ShoppingListContextComponent({children}) {
    const [shoppingList, setShoppingList] = useState(null)
    const [popularItems, setPopularItems] = useState(null)

    useEffect(() => {
        const collectionRef = collection(db, "shoppingList/history/items")
        const q = query(collectionRef, where("quantity", ">", 1))
        const unsub = onSnapshot(q, querySnapshot => {
            const arr = 
                querySnapshot.docs
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
        updateHistoryLog(itemName)
    }

    async function updateHistoryLog(itemName) {
        const collectionRef = collection(db, "shoppingList/history/items")
        const q = query(collectionRef, where("name", "==", itemName))
        const querySnapshot = await getDocs(q)
        
        const itemIdArr = []
        querySnapshot.forEach(doc => itemIdArr.push(doc.id))

        if (itemIdArr.length === 0) {
            addNewHistoryItem(itemName)

            return
        }

        incrementQuantityFirebaseHistoryItem(itemIdArr[0]) 
    }

    async function addNewHistoryItem(itemName) {
        const collectionRef = collection(db, "shoppingList/history/items")
        const itemObj = {
            name: itemName,
            quantity: 1
        }

        await addDoc(collectionRef, itemObj)
    }

    async function incrementQuantityFirebaseHistoryItem(historyItemId) {
        const docRef = doc(db, "shoppingList/history/items", historyItemId)
        const docSnap = await getDoc(docRef)

        await updateDoc(docRef, { quantity: docSnap.data().quantity + 1})
    }

    function deleteSelectioninFirebase() {
        shoppingList
            .filter(item => item.selected === true)
            .forEach(slectedItem => deleteFirebaseItemSelected(slectedItem.id))
    }

    async function deleteFirebaseItemSelected(itemId) {
        const docRef = doc(db, "shoppingList", itemId)

        await deleteDoc(docRef)
    }
    
    return (
        <ShoppingListContext.Provider 
            value={
                {
                    shoppingList, 
                    popularItems,
                    toggleItemSelectedInFirebase,
                    addItemToShoppingListInFirebase,
                    deleteSelectioninFirebase
                }
            }
        >
            {children}
        </ShoppingListContext.Provider>
    )
}

export { ShoppingListContext }