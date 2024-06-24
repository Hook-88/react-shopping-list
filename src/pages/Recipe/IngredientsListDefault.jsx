import List from "../../components/List/List"
import { useStore } from "../../store/store"
import Ingredient from "./Ingredient"
import IngredientsSelectionProgress from "./IngredientsSelectionProgress"
import ToggleSelectAllButton from "./ToggleSelectAllButton"

export default function IngredientsListDefault() {
    const ingredients = useStore(state => state.ingredients)
    const ingredientsSelected = ingredients.filter(ingredient => ingredient.selected === true)

    return (        
        <div className="flex flex-col gap-1">
            <List.Header>
                {
                    ingredientsSelected.length > 0 &&
                    <IngredientsSelectionProgress />
                }
                <ToggleSelectAllButton />
            </List.Header>

            <List>
                {
                    ingredients.map(ingredient => (
                        <Ingredient key={ingredient.id} ingredientId={ingredient.id}/> 
                    ))
                }
            </List>

        </div> 
    )
}