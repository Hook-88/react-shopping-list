import { useParams } from "react-router-dom"
import getStringFirstCharCap from "../../utility/getStringFirstCharCap"
import { useForm } from "react-hook-form"
import setFirebaseRecipeName from "../../utility/firestoreFn/setFirebaseRecipeName"

export default function EditRecipeNameEl({nameValue}) {
    const params = useParams()
    const {register, handleSubmit } = useForm({
        defaultValues: {
            recipeName: getStringFirstCharCap(nameValue)
        }
    })

    function onSubmit(formData) {
        setFirebaseRecipeName(params.recipeId, formData.recipeName)
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
                    {...register("recipeName")}
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