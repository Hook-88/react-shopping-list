import { useEffect, useState } from "react"
import List from "../../components/List/List"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../../firebase/firebase"
import LinkNav from "../../components/Links/LinkNav"
import getCapString from "../../utility/getCapString"
import { useStore } from "../../store/store"
import ShowAddRecipeFormButton from "./ShowAddRecipeFormButton"
import AddRecipeToFirebase from "./AddRecipeToFirebase"
import LinkNavBack from "../../components/Links/LinkNavBack"
import PageHeader from "../../components/PageHeader/PageHeader"


export default function RecipesPage() {
    const [recipes, setRecipes] = useState([])
    const formData = useStore(state => state.formData)

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "recipes"), snapshot => {
            const arr = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))

            setRecipes(arr)
        })

        return unsub
    },[])
    
    return (
        <>
        <PageHeader>
            <LinkNavBack className="col-span-2" />
            <PageHeader.Title className="col-start-3 col-span-5">Recipes</PageHeader.Title>
            <ShowAddRecipeFormButton />
        </PageHeader>

        <main className="px-4 mt-12 flex flex-col gap-4 pb-5">
            <List>
                {
                    recipes.map(recipe => (
                        <li key={recipe.id}>
                            <LinkNav to={recipe.id}>{getCapString(recipe.name)}</LinkNav>
                        </li>
                    ))
                }
            </List>
            { formData && <AddRecipeToFirebase /> }
        </main>
        </>
    )
    

}