import { doc, onSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../firebase"

export default function useRecipeNameSnapshot(recipeId) {
    const [recipeName, setRecipeName] = useState(null)

    useEffect(() => {
        const docRef = doc(db, "recipes", recipeId)
        const unsub = onSnapshot(docRef, docSnapshot => {
            const obj = {
                ...docSnapshot.data(),
                id: docSnapshot.id
            }

            setRecipeName(obj)
        })

        return unsub
    }, [])

    return recipeName
}