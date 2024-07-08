import PageHeader from "../../components/PageHeader/PageHeader"
import { useLocation, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import addFirebaseIngredient from "../../utility/firestoreFn/addFirebaseIngredient"
import { useAtom } from "jotai"
import { pageFormsOpenAtom } from "../../store/store"

export default function AddIngredientEl() {
    const params = useParams()
    const location = useLocation()
    const [openForm, setOpenForm] = useAtom(pageFormsOpenAtom)
    const {register, handleSubmit, reset} = useForm({
        defaultValues: {
            ingredientName: ""
        }
    })

    function handleClickClose() {
        setOpenForm(false)
    }

    function onSubmit(formData) {
        addFirebaseIngredient(formData.ingredientName, params.recipeId)
        reset()
    }
    
    return (
        <div className="bg-white/10 p-2 rounded-md">
            <form className="grid gap-2" 
                onSubmit={handleSubmit(onSubmit)}
            >
                <input 
                    type="text" 
                    className="py-1 px-2 rounded-md bg-white/10"
                    placeholder="Ingredient..."
                    {...register("ingredientName")}
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