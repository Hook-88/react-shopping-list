import { useParams } from "react-router-dom"
import getStringFirstCharCap from "../../utility/getStringFirstCharCap"
import { useForm } from "react-hook-form"
import setFirebaseRecipeName from "../../utility/firestoreFn/setFirebaseRecipeName"
import { doc } from "firebase/firestore"
import { db } from "../../firebase"
import setFirebaseIngredientName from "../../utility/firestoreFn/setFirebaseIngredientName"

export default function EditIngredientEl({nameValue}) {
    const params = useParams()
    const {register, handleSubmit } = useForm({
        defaultValues: {
            ingredientName: getStringFirstCharCap(nameValue)
        }
    })

    function onSubmit(formData) {
        // setFirebaseRecipeName(params.recipeId, formData.recipeName)
        const docRef = doc(db, `recipes/${params.recipeId}/ingredients`, params.ingredientId)
        setFirebaseIngredientName(docRef, formData.ingredientName)
    }
    
    return (
        <div 
            className="bg-white/10 p-2 rounded-md"
        >
            <form className="grid gap-2" 
                onSubmit={handleSubmit(onSubmit)}
            >
                <input 
                    type="text" 
                    className="py-1 px-2 rounded-md bg-white/10 text-center"
                    placeholder="Recipe name..."
                    {...register("ingredientName")}
                    required
                    autoFocus
                />
                <div className="flex gap-2">
                    <button 
                        className="flex-grow py-1 bg-green-900 rounded-md border border-white/10"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}