import PageHeader from "../../components/PageHeader/PageHeader"
import LinkNavBack from "../../components/Links/LinkNavBack"
import { useContext } from "react"
import { useParams } from "react-router-dom"
import List from "../../components/List/List"
import Card from "../../components/Card"
import { RecipeContext } from "./RecipeState"
import ListIngredientsHeader from "./ListIngredientsHeader"
import ListIngredientsList from "./ListIngredientsList"
import Button from "../../components/Buttons/Button"
import { FaCartShopping } from "react-icons/fa6"
import { ShoppingListContext } from "../ShoppingList/ShoppingListContextComponent"
import DialogConfirmEl from "../../components/DialogConfirm/DialogConfirmEl"
import { DialogConfirmContext } from "../../components/DialogConfirm/DialogConfirm"

export default function RecipePage() {
    const { recipeId } = useParams()
    const {recipeObj, updateRecipeObj, clearRecipeObj, setIngredientsSelect} = useContext(RecipeContext)
    const {addItemToShoppingListInFirebase} = useContext(ShoppingListContext)
    const someIngredientsSelected = recipeObj?.ingredients.some(ingredient => ingredient.selected === true)
    const { dialogObj, setDialogObj } = useContext(DialogConfirmContext)
    
    updateRecipeObj(recipeId)
    
    function handleClickBack() {
        clearRecipeObj()
    }

    function handleClickAdd() {
        setDialogObj({
            question: "Add selection to shopping list?",
            confirmCallbackFn: () => addSelectionToFirebaseShoppingList()
        })
    }

    function addSelectionToFirebaseShoppingList() {
        const ingredientsSelected = recipeObj.ingredients.filter(ingredient => ingredient.selected === true)
        ingredientsSelected.forEach(ingredient => addItemToShoppingListInFirebase(ingredient.name))
        setIngredientsSelect(false)
    }

    return (
        <>
            <PageHeader>
                <LinkNavBack className="col-span-2" onClick={handleClickBack}/>
                <PageHeader.Title className="col-start-3 col-span-5">{recipeObj?.name ? recipeObj.name: "Loading..."}</PageHeader.Title>
            </PageHeader>
            {
                recipeObj?.ingredients &&
                <main className="mt-12 px-4 flex flex-col gap-4">
                    <List listArr={recipeObj.ingredients}>
                        <ListIngredientsHeader />
                        <ListIngredientsList />
                    </List>
                    <Card className="px-2">
                        <Button 
                            className="w-full flex items-center justify-center gap-1 bg-green-900 disabled:text-white/50 disabled:bg-green-900/50"
                            disabled={!someIngredientsSelected}
                            onClick={handleClickAdd}
                        >
                            Add to Shopping list
                            <FaCartShopping />
                        </Button>
                    </Card>
                </main>
            }
            {
                dialogObj && <DialogConfirmEl />
            }
        </>
    )
}