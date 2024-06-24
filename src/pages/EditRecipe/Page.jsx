import { useStore } from "../../store/store"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../../firebase/firebase"

export default function Page() {
    const { recipeId } = useParams()
    const ingredients = useStore(state => state.ingredients)
    const setIngredients = useStore(state => state.setRecipeIngredients)

    return (
        <>
            edit recipe
        </>
    )
    

}