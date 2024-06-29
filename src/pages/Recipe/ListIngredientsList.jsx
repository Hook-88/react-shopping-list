import { useContext } from "react"
import { RecipeContext } from "./RecipeState"
import List from "../../components/List/List"
import ListIngredientsListItemDefault from "./ListIngredientsListItemDefault"
import ListIngredientsListItemSelected from "./ListIngredientsListItemSelected"

export default function ListIngredientsList() {
    const { recipeObj } = useContext(RecipeContext)
    const ingredients = recipeObj?.ingredients
    
    return (
        ingredients.length > 0 ?
            <List.List>
                {
                    ingredients => ingredients.map(ingredient => (
                        ingredient.selected ?
                        <ListIngredientsListItemSelected 
                            key={ingredient.id} 
                            ingredient={ingredient} 
                        /> :
                        <ListIngredientsListItemDefault 
                            key={ingredient.id} 
                            ingredient={ingredient} 
                        /> 
                    ))
                }
            </List.List> : null
    )
}