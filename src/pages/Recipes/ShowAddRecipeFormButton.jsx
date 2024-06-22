import IconAdd from "../../components/Icons/IconAdd"
import { useStore } from "../../store/store"

export default function ShowAddRecipeFormButton() {
    const setFormOpen = useStore(state => state.updateFormData)

    function handleClickAddButton() {
        setFormOpen(true)
    }
    
    return (
        <button 
            className="col-start-9 flex justify-end items-center"
            onClick={handleClickAddButton}
        >
            <IconAdd className="mr-5"/>
        </button>
    )
}