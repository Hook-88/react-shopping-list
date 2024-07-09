import { useNavigate, useParams } from "react-router-dom"
import PageHeader from "../../components/PageHeader/PageHeader"
import useRecipeNameSnapshot from "../../hooks/useRecipeNameSnapshot"
import getStringFirstCharCap from "../../utility/getStringFirstCharCap"
import PageMain from "../../components/PageMain/PageMain"
import { useAtom } from "jotai"
import { confirmDialogAtom, pageFormsOpenAtom } from "../../store/store"
import NavLinkBack from "../../components/Links/NavLinkBack"
import useIngredientSnapshot from "../../hooks/useIngredientSnapshot"
import EditIngredientEl from "./EditIngredientEl"
import DeleteIngredientEl from "./DeleteIngredientEl"
import ConfirmDialog from "../../components/ConfirmDialog.jsx/ConfirmDialog"
import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../../firebase"

export default function IngredientEditPage() {
    const params = useParams()
    const ingredient = useIngredientSnapshot(params.recipeId, params.ingredientId)
    const [confirmObj, setConfirmObj] = useAtom(confirmDialogAtom)
    const navigate = useNavigate()

    function handleClickDelete() {
        setConfirmObj({
            question: "Delete ingredient?",
            onConfirm: () => handleDeleteIngredient()
        })
    }

    function handleDeleteIngredient() {
        deleteFirebaseIngredient()
        navigate("./../..")
    }

    async function deleteFirebaseIngredient() {
        const docRef = doc(db, `recipes/${params.recipeId}/ingredients`, params.ingredientId)

        await deleteDoc(docRef)
    }
    
    return (
        <>
            <PageHeader>
                <NavLinkBack to="./../.."/>
                <PageHeader.Title>
                    {ingredient?.name ? `${getStringFirstCharCap(ingredient.name)} (edit)` : "Loading..."}
                </PageHeader.Title>
            </PageHeader>

            <PageMain>
                {
                    ingredient && <EditIngredientEl nameValue={ingredient.name}/>
                }
                <DeleteIngredientEl onClick={handleClickDelete}/>
            </PageMain>
            {
                confirmObj && <ConfirmDialog />
            }
            
        </>
    )
}