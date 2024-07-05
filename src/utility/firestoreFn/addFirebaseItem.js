import { collection, addDoc } from "firebase/firestore"
import { db } from "../../firebase"

export default async function addItemToFirebase(itemName) {
    const itemObj = {
        name: itemName.trim().toLowerCase(),
        quantity: 1,
        selected: false
    }
    const collectionRef = collection(db, "shoppingList")
    
    await addDoc(collectionRef, itemObj)
}