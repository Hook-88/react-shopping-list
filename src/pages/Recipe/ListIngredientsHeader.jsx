import { useContext } from "react"
import { RecipeContext } from "./RecipeState"
import List from "../../components/List/List"

export default function ListIngredientsHeader() {
    const {recipeObj, setIngredientsSelect} = useContext(RecipeContext)
    const someNotSelected = recipeObj?.ingredients.some(ingredient => ingredient.selected === false)
    
    return (
        <List.Header className="flex items-center justify-between mb-0.5">
            <List.Progress />
            <button 
                className="flex items-center pr-1.5 disabled:text-white/50"
                onClick={() => setIngredientsSelect(someNotSelected)}
            >
                {
                    someNotSelected ? 
                    <small className="flex items-center">
                        Select all
                    </small> :
                    <small className="flex items-center">
                        Deselect all
                    </small>
                }        
            </button>
        </List.Header>
    )
}