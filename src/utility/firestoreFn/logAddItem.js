import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { db } from "../../firebase"

async function logAddItem(itemObj) {
    const collectionRef = collection(db, "history/shoppingList/items")
    const q = query(collectionRef, where("name", "==", itemObj.name))
    const qDocs = await getDocs(q)

    if (qDocs.docs.length > 0) {
        incrementFirebaseHistoryShoppingListItemQuantity(qDocs.docs[0].id)

        return
    }

    addFirebaseHistoryShoppingListItem(itemObj)
}

async function addFirebaseHistoryShoppingListItem(itemObj) {
    const logItemObj = {
        name: itemObj.name,
        quantity: itemObj.quantity
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
    