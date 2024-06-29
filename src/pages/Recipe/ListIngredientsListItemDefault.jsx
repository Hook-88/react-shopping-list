import { useContext } from "react"
import { RecipeContext } from "./RecipeState"
import getCapString from "../../utility/getCapString"
import Card from "../../components/Card"


export default function ListIngredientsListItemDefault({ingredient}) {
    const { setRecipeObj } = useContext(RecipeContext)

    function toggleSelect(ingredientId) {
        setRecipeObj(prevRecipeObj => ({
            ...prevRecipeObj,
            ingredients: prevRecipeObj.ingredients.map(ingredient => (
                ingredient.id === ingredientId ? {...ingredient, selected: !ingredient.selected} : ingredient
            ))
        }))
    }
    
    return (
        <li 
            className="border border-transparent"
            onClick={() => toggleSelect(ingredient.id)}
        >
            <Card>
                { getCapString(ingredient.name) }
            </Card>
        </li>
    )
}