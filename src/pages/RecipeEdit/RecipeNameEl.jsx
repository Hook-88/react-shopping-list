import { useContext } from "react"
import { RecipeContext } from "../Recipe/RecipeState"
import Card from "../../components/Card"
import { useParams } from "react-router-dom"
import getCapString from "../../utility/getCapString"
import { editIngredientFormAtom } from "../../store/store"
import { useAtom } from "jotai"
import EditRecipeNameEl from "./EditRecipeNameEl"


export default function RecipeNameEl() {
    const { recipeId } = useParams()
    const {
        recipeObj, 
        updateRecipeObj,
        setIngredientsSelect
    } = useContext(RecipeContext)
    const [formRecipeNameData, setFormRecipeNameData] = useAtom(editIngredientFormAtom)

    updateRecipeObj(recipeId)

    function handleClickRecipeName() {
        setFormRecipeNameData({recipeName: recipeObj.name})
        setIngredientsSelect(false)
    }

    return (
        <div>
            <small className="ml-4">Recipe name</small>
            {
                formRecipeNameData?.recipeName ?
                <EditRecipeNameEl /> :
                <Card onClick={handleClickRecipeName}>
                    {getCapString(recipeObj.name)}
                </Card>
            }
        </div>     
    )
}