import ListItemDefault from "./ListItemDefault"
import ListItemSelected from "./ListItemSelected"
import ListHeader from "./ListHeader"
import { RecipeContext } from "./RecipePage"
import { useContext } from "react"

export default function ListIngredientsEl() {
    const { localIngredients, toggleSelectIngredient } = useContext(RecipeContext)
    
    return (
        <div>
            <ListHeader />
            <ul>
                {
                    localIngredients.map(ingredient => ( ingredient.selected ? 
                        
                        <ListItemSelected
                            key={ingredient.id} 
                            onClick={() => toggleSelectIngredient(ingredient.id)}
                        >
                            {ingredient.name}
                        </ListItemSelected> :

                        <ListItemDefault
                            key={ingredient.id} 
                            onClick={() => toggleSelectIngredient(ingredient.id)}
                        >
                            {ingredient.name}
                        </ListItemDefault>
                    ))
                }
            </ul>
        </div>
    )
}