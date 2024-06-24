import { useStore } from "../../store/store"
import IconCheck from "../../components/Icons/IconCheck"

export default function IngredientsListDefault() {
    const ingredients = useStore(state => state.ingredients)
    const setIngredients = useStore(state => state.setIngredients)
    const ingredientsSelected = ingredients.filter(ingredient => ingredient.selected === true)

    function selectAllIngredients(value) {
        const arr = ingredients.map(ingredient => ({...ingredient, selected: value}))
        setIngredients(arr)
    }

    function toggleSelectAll() {
        
        return ingredientsSelected.length === ingredients.length ?
            selectAllIngredients(false) : selectAllIngredients(true)
    }

    return (        
        <button 
            className="text-sm col-span-3 col-start-4 justify-end items-center pr-4 flex gap-1"
            onClick={toggleSelectAll}
        >
            {
                ingredientsSelected.length === ingredients.length ?
                "Clear selection" :
                <>
                    Select all
                    <IconCheck />
                </>
            }
        </button>
    )
}