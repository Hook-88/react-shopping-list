import { useStore } from "../../store/store"
import LinkNavBack from "../../components/Links/LinkNavBack"
import PageHeader from "../../components/PageHeader/PageHeader"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { addDoc, collection, doc, onSnapshot } from "firebase/firestore"
import { db } from "../../firebase/firebase"
import IngredientsListDefault from "./IngredientsListDefault"
import RecipesPageHeader from "./RecipePageHeader"
import AddItem from "../../components/AddItem"

export default function RecipesPage() {
    const { recipeId } = useParams()
    const ingredients = useStore(state => state.ingredients)
    const setIngredients = useStore(state => state.setRecipeIngredients)
    const formData = useStore(state => state.formData)

    async function addIngredientToFirebase() {
        const collectionRef = collection(db, `recipes/${recipeId}/ingredients`)
        const obj = {
            name: formData.itemName,
            optional: false
        }
        
        await addDoc(collectionRef, obj)
    }

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
                ingredients &&
                <IngredientsListDefault />
            }
            {
                formData && <AddItem onSubmit={addIngredientToFirebase}/>
            }
            
        </main>
        </>
    )
    

}