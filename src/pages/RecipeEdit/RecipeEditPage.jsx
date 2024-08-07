import PageHeader from "../../components/PageHeader/PageHeader"
import { useNavigate, useParams } from "react-router-dom"
import PageMain from "../../components/PageMain/PageMain"
import getStringFirstCharCap from "../../utility/getStringFirstCharCap"
import RecipeNameEl from "./RecipeNameEl"
import RecipeIngredientsEl from "./RecipeIngredientsEl"
import { useAtom } from "jotai"
import { confirmDialogAtom, pageFormsOpenAtom } from "../../store/store"
import AddIngredientEl from "./AddIngredientEl"
import useIngredientsValue from "../../hooks/useIngredientsValue"
import ConfirmDialog from "../../components/ConfirmDialog.jsx/ConfirmDialog"
import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../../firebase"
import DeleteRecipeEl from "./DeleteRecipeEl"
import MenuRecipeEditPage from "./MenuRecipeEditPage"
import NavLinkBack from "../../components/Links/NavLinkBack"

export default function RecipeEditPage() {
    const { recipeName, recipeId } = useParams()
    const ingredients = useIngredientsValue(recipeId)
    const [openForm, setOpenForm] = useAtom(pageFormsOpenAtom)
    const [confirmObj, setConfirmObj] = useAtom(confirmDialogAtom)
    const navigate = useNavigate()

    function handleClickDelete() {
        setConfirmObj({
            question: "Delete recipe?",
            onConfirm: () => handleDeleteRecipe()
        })
    }

    function handleDeleteRecipe() {
        deleteFirebaseRecipe()
        navigate("/recipes")
    }

    async function deleteFirebaseRecipe() {
        const docRef = doc(db, "recipes", recipeId)

        await deleteDoc(docRef)
    }
    
    return (
        <>
            <PageHeader>
                <NavLinkBack />
                <PageHeader.Title>Edit {getStringFirstCharCap(recipeName)}</PageHeader.Title>
                <MenuRecipeEditPage />
            </PageHeader>
            <PageMain>

                <RecipeNameEl />
                {
                    ingredients && (
                        <RecipeIngredientsEl 
                            ingredients={ingredients} 
                        />
                    )
                }
                
                { openForm && <AddIngredientEl /> }

                <DeleteRecipeEl onClick={handleClickDelete}/>

            </PageMain>

            {
                confirmObj && <ConfirmDialog />
            }

        </>
    )
}