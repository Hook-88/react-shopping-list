import { useContext } from "react"
import { RecipeContext } from "../Recipe/RecipeState"
import List from "../../components/List/List"
import { useParams } from "react-router-dom"
import { FormContext } from "../../Context/FormContextComponent"
import AddIngredientEl from "./AddIngredientEl"
import { DialogConfirmContext } from "../../components/DialogConfirm/DialogConfirm"
import DialogConfirmEl from "../../components/DialogConfirm/DialogConfirmEl"
import DeleteRecipeEl from "./DeleteRecipeEl"
import ListIngredientsList from "./ListIngredientsList"
import RecipeEditPageHeader from "./RecipeEditPageHeader"
import RecipeNameEl from "./RecipeNameEl"
import IngredientsListEl from "./IngredientsListEl"

export default function RecipeEditPage() {
    const { recipeId } = useParams()
    const { formData } = useContext(FormContext)
    const { dialogObj } = useContext(DialogConfirmContext)
    const {
        recipeObj, 
        updateRecipeObj,
    } = useContext(RecipeContext)

    updateRecipeObj(recipeId)

    return (
        <>
        <RecipeEditPageHeader />
        {
            recipeObj?.ingredients &&
            <main className="my-12 px-4 flex flex-col gap-4">
                <RecipeNameEl />
                <IngredientsListEl />

                { formData && <AddIngredientEl /> }

                <DeleteRecipeEl />
            </main>
        }
        { dialogObj && <DialogConfirmEl /> }
    </>
    )
}