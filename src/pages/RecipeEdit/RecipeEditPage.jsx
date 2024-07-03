import PageHeader from "../../components/PageHeader/PageHeader"
import LinkNavBack from "../../components/Links/LinkNavBack"
import { useContext } from "react"
import { RecipeContext } from "../Recipe/RecipeState"
import Card from "../../components/Card"
import List from "../../components/List/List"
import { useParams } from "react-router-dom"
import { FormContext } from "../../Context/FormContextComponent"
import AddIngredientEl from "./AddIngredientEl"
import RecipeEditMenu from "./RecipeEditMenu"
import { DialogConfirmContext } from "../../components/DialogConfirm/DialogConfirm"
import DialogConfirmEl from "../../components/DialogConfirm/DialogConfirmEl"
import DeleteRecipeEl from "./DeleteRecipeEl"
import ListIngredientsList from "./ListIngredientsList"

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
        <PageHeader>
            <LinkNavBack 
                className="col-span-2" 
            />
            <PageHeader.Title className="col-start-3 col-span-5">
                {recipeObj?.name ? `Edit ${recipeObj.name}`: "Loading..."}
            </PageHeader.Title>

            <RecipeEditMenu />
        </PageHeader>
        {
            recipeObj?.ingredients &&
            <main className="my-12 px-4 flex flex-col gap-4">
                <div>
                    <small className="ml-4">Recipe name</small>
                    <Card>
                        {recipeObj.name}
                    </Card>
                </div>      

                <List listArr={recipeObj.ingredients}>
                    <List.Header>
                        <small>Ingredients</small>
                    </List.Header>
                    <ListIngredientsList />
                </List>
                { formData && <AddIngredientEl /> }
                <DeleteRecipeEl />
            </main>
        }
        {
            dialogObj && <DialogConfirmEl />
        }
    </>
    )
}