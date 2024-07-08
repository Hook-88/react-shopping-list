import { addDoc, collection } from "firebase/firestore"
import { db } from "../../firebase"

export default async function addFirebaseIngredient(ingredientName, recipeId) {
    const collectionRef = collection(db, `recipes/${recipeId}/ingredients`)
    
    const ingredientObj = {
        name: ingredientName.trim().toLowerCase(),
        optional: false
    }

    await addDoc(collectionRef, ingredientObj)

}