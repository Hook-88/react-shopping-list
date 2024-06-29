import { useContext } from "react"
import { RecipeContext } from "./RecipeState"
import getCapString from "../../utility/getCapString"
import Card from "../../components/Card"

export default function ListIngredientsListItemSelected({ingredient}) {
    const {setRecipeObj} = useContext(RecipeContext)

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
            onClick={() => toggleSelect(ingredient.id)}
        >
            <Card className="font-bold border-2 border-green-900">
                { getCapString(ingredient.name) }
            </Card>
        </li>
    )
}