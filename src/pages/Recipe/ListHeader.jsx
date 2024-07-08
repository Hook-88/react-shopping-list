import { RecipeContext } from "./RecipePage"
import { useContext } from "react"

export default function ListHeader() {
    const { selectAllIngredients, localIngredients } = useContext(RecipeContext)
    const numOfCheckedIngredients = localIngredients?.filter(ingredient => ingredient.selected === true).length
    const allSelected = numOfCheckedIngredients === localIngredients?.length

    function handleClickToggleSelectAll() {
        selectAllIngredients(!allSelected)
    }
    
    return (
        <div className="flex items-center justify-between px-4 mb-1">
            {/* progress */}
            <small>
                { `(${numOfCheckedIngredients}/${localIngredients?.length})` }
                { allSelected && " All selected" }
            </small>

            {/* toggleSelectAll */}
            <button 
                className="flex items-center" 
                onClick={handleClickToggleSelectAll}
            >
                <small className="flex items-center gap-1">
                    { allSelected ? "Deselect all" : "Select all" }
                </small>
            </button>

        </div>

    )
}