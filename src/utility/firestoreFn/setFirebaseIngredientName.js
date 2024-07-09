import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase"

export default async function setFirebaseIngredientName(docRef, newValue) {
    const moddedValue = newValue.trim().toLowerCase()

    await updateDoc(docRef, {name: moddedValue})
}