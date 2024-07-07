import { useEffect, useState } from "react"
import PageHeader from "../../components/PageHeader/PageHeader"
import PageMain from "../../components/PageMain/PageMain"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../../firebase"
import NavLinkTo from "../../components/Links/NavLinkTo"
import getStringFirstCharCap from "../../utility/getStringFirstCharCap"

export default function RecipesPage() {
    const [recipes, setRecipes] = useState(null)

    useEffect(() => {
        const collectionRef = collection(db, "recipes")
        const unsub = onSnapshot(collectionRef, collectionSnapshot => {
            const arr = collectionSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id}))

            setRecipes(arr)
        })

        return unsub
    }, [])
    
    return (
        <>
            <PageHeader>
                <PageHeader.Title>Recipes</PageHeader.Title>
            </PageHeader>
            {
                recipes && (
                    <PageMain>
                        <ul>
                            {
                                recipes.map(recipe => (
                                    <li key={recipe.id}>
                                        <NavLinkTo to={recipe.id}>
                                            {getStringFirstCharCap(recipe.name)}
                                        </NavLinkTo>
                                    </li>
                                ))
                            }
                        </ul>
                    </PageMain>
                )
            }
        </>
    )
}