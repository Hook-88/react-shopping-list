import { useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { DialogConfirmContext } from "../../components/DialogConfirm/DialogConfirm"
import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../../firebase/firebase"
import Button from "../../components/Buttons/Button"
import Card from "../../components/Card"

export default function DeleteRecipeEl() {
    const {recipeId} = useParams()
    const { setDialogObj } = useContext(DialogConfirmContext)

    const navigate = useNavigate()

    function handleClickDelete() {
        setDialogObj({
            question: "Delete recipe?",
            confirmCallbackFn: () => handleDeleteRecipe()
        })
    }

    function handleDeleteRecipe() {
        navigate("./../..")
        DeleteFirebaseRecipe()
    }

    async function DeleteFirebaseRecipe() {
        const docRef = doc(db, "recipes", recipeId)
        
        await deleteDoc(docRef)
    }

    return (
        <Card className="px-2">
            <Button 
                className="w-full flex items-center justify-center gap-1 bg-red-900"
                onClick={handleClickDelete}
            >
                Delete recipe
            </Button>
        </Card>
    )
}