import { useStore } from "../../store/store"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../../firebase/firebase"
import IngredientsListDefault from "./IngredientsListDefault"
import RecipesPageHeader from "./RecipePageHeader"
import AddItem from "../../components/AddItem"
import AddIngredientToFirebase from "./AddIngredientToFirebase"
import Card from "../../components/Card"
import Button from "../../components/Buttons/Button"
import AddSelectionToShoppingList from "./AddSelectionToShoppingList"

export default function RecipesPage() {
    const { recipeId } = useParams()
    const ingredients = useStore(state => state.ingredients)
    const setIngredients = useStore(state => state.setRecipeIngredients)
    const formData = useStore(state => state.formData)

    useEffect(() => {
        const unsub = onSnapshot(collection(db, `recipes/${recipeId}/ingredients`), snapshot => {
            const arr = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
            }))

            setIngredients(arr)
        })

        return unsub
    }, [])

    return (
        <>
        <RecipesPageHeader />
        <main className="px-4 mt-12 flex flex-col gap-4 pb-5">
            {
                ingredients && <IngredientsListDefault />
            }
            {
                formData && <AddIngredientToFirebase />
            }
            <AddSelectionToShoppingList />           
        </main>
        </>
    )
    

}