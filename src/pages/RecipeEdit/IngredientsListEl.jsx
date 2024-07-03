import { useContext } from "react"
import { RecipeContext } from "../Recipe/RecipeState"
import List from "../../components/List/List"
import ListIngredientsList from "./ListIngredientsList"

export default function IngredientsListEl() {
    const { recipeObj } = useContext(RecipeContext)

    return (
        <List listArr={recipeObj.ingredients}>
            <List.Header>
                <small>Ingredients</small>
            </List.Header>
            <ListIngredientsList />
        </List>
    )
}