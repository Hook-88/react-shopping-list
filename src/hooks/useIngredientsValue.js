import { useState, useEffect } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"

export default function useIngredientsValue(recipeId) {
    const [ingredients, setIngredients] = useState(null)

    useEffect(() => {
        getFirebaseIngredients()
    }, [])
    
    async function getFirebaseIngredients() {
        const collectionRef = collection(db, `recipes/${recipeId}/ingredients`)
        const collectionDocs = await getDocs(collectionRef)
        const arr = collectionDocs.docs.map(doc => ({...doc.data(), id: doc.id}))

        setIngredients(arr)
    }

    return ingredients
}