import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { db } from "../../firebase"

async function logAddItem(itemName) {
    const collectionRef = collection(db, "history/shoppingList/items")
    const q = query(collectionRef, where("name", "==", itemName))
    const qDocs = await getDocs(q)

    if (qDocs.docs.length > 0) {
        incrementFirebaseHistoryShoppingListItemQuantity(qDocs.docs[0].id)

        return
    }

    addFirebaseHistoryShoppingListItem(itemName)
}

async function addFirebaseHistoryShoppingListItem(itemName) {
    const logItemObj = {
        name: itemName,
        quantity: 1
    }
    const collectionRef = collection(db, "history/shoppingList/items")

    await addDoc(collectionRef, logItemObj)
}

async function incrementFirebaseHistoryShoppingListItemQuantity(historyItemId) {
    const docRef = doc(db, "history/shoppingList/items", historyItemId)
    const docSnap = await getDoc(docRef)

    await updateDoc(docRef, { quantity: docSnap.data().quantity + 1 })
}

export { logAddItem }
    