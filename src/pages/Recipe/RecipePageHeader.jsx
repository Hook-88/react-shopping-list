import { useStore } from "../../store/store"
import LinkNavBack from "../../components/Links/LinkNavBack"
import PageHeader from "../../components/PageHeader/PageHeader"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../../firebase/firebase"
import HeaderMenu from "./HeaderMenu"
import PageTitle from "./PageTitle"


export default function RecipesPageHeader() {
    const { recipeId } = useParams()
    const setRecipe = useStore(state => state.setRecipe)
    const clearLocalIngredients = useStore(state => state.clearIngredients)

    function handleClickBackLink() {
        setRecipe({})
        clearLocalIngredients()
    }

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
        <PageHeader>
            <LinkNavBack className="col-span-2" onClick={handleClickBackLink}/>
            <PageTitle />
            <HeaderMenu />
        </PageHeader>

    )
    

}