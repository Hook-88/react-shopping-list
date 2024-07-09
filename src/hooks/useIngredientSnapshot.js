import { doc, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../firebase"

export default function useIngredientSnapshot(recipeId, ingredientId) {
    const [ingredient, setIngredient] = useState(null)

    useEffect(() => {
        const docRef = doc(db, `recipes/${recipeId}/ingredients`, ingredientId)
        const unsub = onSnapshot(docRef, docSnapshot => {
            const obj = {
                ...docSnapshot.data(),
                id: docSnapshot.id
            }

            setIngredient(obj)
        })

        return unsub
    }, [])

    return ingredient
}