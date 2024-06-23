import { useStore } from "../../store/store"
import PageHeader from "../../components/PageHeader/PageHeader"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../../firebase/firebase"
import getCapString from "../../utility/getCapString"


export default function PageTitle() {
    const { recipeId } = useParams()
    const recipe = useStore(state => state.recipe)
    const setRecipe = useStore(state => state.setRecipe)

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "recipes", recipeId), snapshot => {
            const obj = {
                name: snapshot.data().name,
                id: snapshot.id
            }
            
            setRecipe(obj)
        })

        return unsub
    }, [])

    return (
        <PageHeader.Title className="col-start-3 col-span-5">
            {
                recipe?.name ?
                getCapString(recipe.name) :
                "Recipe"
            }
        </PageHeader.Title>

    )
    

}