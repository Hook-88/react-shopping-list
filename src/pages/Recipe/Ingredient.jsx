import { useStore } from "../../store/store"
import IngredientDefault from "./IngredientDefault"
import IngredientSelected from "./IngredientSelected"

export default function Ingredient({ ingredientId }) {
    const ingredientObj = useStore(state => state.ingredients.find(ingredient => ingredient.id === ingredientId))
    const toggleSelected = useStore(state => state.toggleIngredientSelected)

    function handleClick() {
        toggleSelected(ingredientObj.id)
    }

    return (
        <div onClick={handleClick}>
            {
                ingredientObj.selected ? 
                <IngredientSelected ingredientObj={ingredientObj} /> :
                <IngredientDefault ingredientObj={ingredientObj} />
            }
        </div>
    )
}