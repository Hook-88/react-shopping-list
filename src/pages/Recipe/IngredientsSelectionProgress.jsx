import List from "../../components/List/List"
import { useStore } from "../../store/store"

export default function IngredientsSelectionProgress() {
    const ingredients = useStore(state => state.ingredients)
    const ingredientsSelected = ingredients.filter(ingredient => ingredient.selected === true)

    return (        
        <List.Progress 
            totalLength={ingredients.length} 
            currentLength={ingredientsSelected.length}
        />
    )
}