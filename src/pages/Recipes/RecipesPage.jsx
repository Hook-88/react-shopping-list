import { useEffect, useState } from "react"
import List from "../../components/List/List"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../../firebase/firebase"
import LinkNav from "../../components/Links/LinkNav"
import getCapString from "../../utility/getCapString"
import { Link } from "react-router-dom"
import { FaAngleLeft } from "react-icons/fa6"
import { useStore } from "../../store/store"
import ShowAddRecipeFormButton from "./ShowAddRecipeFormButton"
import AddRecipeToFirebase from "./AddRecipeToFirebase"
import LinkNavBack from "../../components/Links/LinkNavBack"


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
        <header className="py-2 px-4 grid grid-cols-9 font-bold text-lg fixed inset-x-0 top-0 bg-black/80">
            <LinkNavBack className="col-span-2" />
            <h1 className="col-start-3 col-span-5 text-center">Recipes</h1>
            <ShowAddRecipeFormButton />
        </header>

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