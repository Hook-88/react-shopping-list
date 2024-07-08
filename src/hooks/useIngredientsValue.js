import { useState, useEffect } from "react"
import { collection, getDocs, onSnapshot } from "firebase/firestore"
import { db } from "../firebase"

export default function useIngredientsValue(recipeId) {
    const [ingredients, setIngredients] = useState(null)

    useEffect(() => {
        const collectionRef = collection(db, `recipes/${recipeId}/ingredients`)
        const unsub = onSnapshot(collectionRef, collectionSnapshot => {
            const arr = collectionSnapshot.docs.map(doc => ({...doc.data(), id: doc.id}))

            setIngredients(arr)
        })

        return unsub
    }, [])

    return ingredients
}