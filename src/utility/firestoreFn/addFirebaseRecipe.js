import { collection, addDoc } from "firebase/firestore"
import { db } from "../../firebase"

export default async function addFirebaseRecipe(recipeName) {
    const collectionRef = collection(db, "recipes")

    await addDoc(collectionRef, {name: recipeName})
}