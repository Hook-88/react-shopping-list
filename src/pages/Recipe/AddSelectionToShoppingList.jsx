import { useStore } from "../../store/store"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { addDoc, collection, doc, onSnapshot, updateDoc } from "firebase/firestore"
import { db } from "../../firebase/firebase"
import Card from "../../components/Card"
import Button from "../../components/Buttons/Button"

export default function AddSelectionToShoppingList() {
    const { recipeId } = useParams()
    const ingredients = useStore(state => state.ingredients)
    const ingredientsSelected = ingredients.filter(ingredient => ingredient.selected === true)
    const setIngredients = useStore(state => state.setRecipeIngredients)

    async function AddItemToShoppingList(itemObj) {
        const collectionRef = collection(db, "shoppingList")

        await addDoc(collectionRef, itemObj)
    }

    function addSelectionToShoppingList() {
        const itemsArr = ingredientsSelected.map(ingredient => {
            const newArr = ingredient
            delete newArr.selected

            return newArr
        })
        const ingredientsArr = ingredients.map(ingredient => ({ ...ingredient, selected: false}))

        itemsArr.forEach(item => AddItemToShoppingList(item))
        setIngredients(ingredientsArr)
    }

    // useEffect(() => {
    //     const unsub = onSnapshot(collection(db, `recipes/${recipeId}/ingredients`), snapshot => {
    //         const arr = snapshot.docs.map(doc => ({
    //             ...doc.data(),
    //             id: doc.id,
    //         }))

    //         setIngredients(arr)
    //     })

    //     return unsub
    // }, [])

    return (
        <Card>
            <Button 
                className="w-full bg-green-900 disabled:bg-green-900/50 disabled:text-white/50"
                onClick={addSelectionToShoppingList}
                disabled={!ingredientsSelected.length > 0}
            >
                Add To Shopping List
            </Button>
        </Card>
    )
    

}