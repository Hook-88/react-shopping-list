import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase"

export default async function setFirebaseRecipeName(recipeId, newValue) {
    const docRef = doc(db, "recipes", recipeId)
    const moddedValue = newValue.trim().toLowerCase()

    await updateDoc(docRef, {name: moddedValue})
}