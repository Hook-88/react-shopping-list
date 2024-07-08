import { useParams } from "react-router-dom"
import PageHeader from "../../components/PageHeader/PageHeader"
import useRecipeNameSnapshot from "../../hooks/useRecipeNameSnapshot"
import getStringFirstCharCap from "../../utility/getStringFirstCharCap"
import PageMain from "../../components/PageMain/PageMain"
import { useForm } from "react-hook-form"
import setFirebaseRecipeName from "../../utility/firestoreFn/setFirebaseRecipeName"

export default function EditRecipeNameEl({nameValue}) {
    const params = useParams()
    // const recipeName = useRecipeNameSnapshot(params.recipeId)
    
    const {register, handleSubmit, reset} = useForm({
        defaultValues: {
            recipeName: getStringFirstCharCap(nameValue)
        }
    })

    function onSubmit(formData) {
        setFirebaseRecipeName(params.recipeId, formData.recipeName)
    }
    
    return (
        <div className="bg-white/10 p-2 rounded-md">
            <form className="grid gap-2" 
                onSubmit={handleSubmit(onSubmit)}
            >
                <input 
                    type="text" 
                    className="py-1 px-2 rounded-md bg-white/10"
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
                    <button 
                        className="px-2 bg-red-900 rounded-md border border-white/10" 
                        type="button"
                        // onClick={handleClickClose}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}