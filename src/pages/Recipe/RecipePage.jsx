import { useStore } from "../../store/store"
import LinkNavBack from "../../components/Links/LinkNavBack"
import PageHeader from "../../components/PageHeader/PageHeader"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../../firebase/firebase"
import List from "../../components/List/List"
import LinkNav from "../../components/Links/LinkNav"
import getCapString from "../../utility/getCapString"


export default function RecipesPage() {
    const { recipeId } = useParams()
    const [ingredients, setIngredients] = useState([])

    useEffect(() => {
        const unsub = onSnapshot(collection(db, `recipes/${recipeId}/ingredients`), snapshot => {
            const arr = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))

            setIngredients(arr)
        })

        return unsub
    }, [])
    

    return (
        <>
        <PageHeader>
            <LinkNavBack className="col-span-2" />
            <PageHeader.Title className="col-start-3 col-span-5">Recipe</PageHeader.Title>
        </PageHeader>

        <main className="px-4 mt-12 flex flex-col gap-4 pb-5">
            <List>
                {
                    ingredients.map(ingredient => (
                        <li key={ingredient}>
                            <List.Item to={ingredient.id}>{getCapString(ingredient.name)}</List.Item>
                        </li>
                    ))
                }
            </List>
        </main>
        </>
    )
    

}