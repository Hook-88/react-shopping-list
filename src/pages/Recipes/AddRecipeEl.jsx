import { useSetAtom } from "jotai"
import { pageFormsOpenAtom } from "../../store/store"
import { useForm } from "react-hook-form"
import addFirebaseRecipe from "../../utility/firestoreFn/addFirebaseRecipe"

export default function AddRecipeEl() {
    const setOpenForm = useSetAtom(pageFormsOpenAtom)
    const {register, handleSubmit, reset} = useForm({
        defaultValues: {
            recipeName: ""
        }
    })

    function handleClickClose() {
        setOpenForm(false)
    }

    function onSubmit(formData) {
        addFirebaseRecipe(formData.recipeName)
        reset()
        setOpenForm(false)
    }
    
    return (
        <div className="bg-white/10 p-2 rounded-md">
            <form className="grid gap-2" 
                onSubmit={handleSubmit(onSubmit)}
            >
                <input 
                    type="text" 
                    className="py-1 px-2 rounded-md bg-white/10"
                    placeholder="Recipe..."
                    {...register("recipeName")}
                    required
                    autoFocus
                />
                <div className="flex gap-2">
                    <button 
                        className="flex-grow py-1 bg-green-900 rounded-md border border-white/10"
                    >
                        Add
                    </button>
                    <button 
                        className="px-2 bg-red-900 rounded-md border border-white/10" 
                        type="button"
                        onClick={handleClickClose}
                    >
                        Close
                    </button>
                </div>
            </form>
        </div>
    )
}