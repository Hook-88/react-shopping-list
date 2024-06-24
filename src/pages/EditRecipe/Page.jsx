import { useStore } from "../../store/store"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../../firebase/firebase"
import PageHeader from "../../components/PageHeader/PageHeader"

export default function Page() {
    const { recipeId } = useParams()
    const ingredients = useStore(state => state.ingredients)
    const setIngredients = useStore(state => state.setRecipeIngredients)

    return (
        <>
            <PageHeader>
                <PageHeader.Title className="col-span-5 col-start-3">Edit Recipe</PageHeader.Title>
            </PageHeader>
        </>
    )
    

}