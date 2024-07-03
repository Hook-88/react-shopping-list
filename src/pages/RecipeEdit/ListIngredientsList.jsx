import PageHeader from "../../components/PageHeader/PageHeader"
import LinkNavBack from "../../components/Links/LinkNavBack"
import { useContext } from "react"
import { RecipeContext } from "../Recipe/RecipeState"
import Card from "../../components/Card"
import List from "../../components/List/List"
import { useNavigate, useParams } from "react-router-dom"
import getCapString from "../../utility/getCapString"
import Button from "../../components/Buttons/Button"
import { FormContext } from "../../Context/FormContextComponent"
import AddIngredientEl from "./AddIngredientEl"
import RecipeEditMenu from "./RecipeEditMenu"
import EditIngredientEl from "./EditIngredientEl"
import { DialogConfirmContext } from "../../components/DialogConfirm/DialogConfirm"
import DialogConfirmEl from "../../components/DialogConfirm/DialogConfirmEl"
import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../../firebase/firebase"
import DeleteRecipeEl from "./DeleteRecipeEl"

export default function ListIngredientsList() {
    const { formData, handleChange, clearFormData, openForm } = useContext(FormContext)
    const { dialogObj, setDialogObj } = useContext(DialogConfirmContext)
    const {
        setRecipeObj, 
    
    } = useContext(RecipeContext)

    function selectIngredient(ingredientId) {
        setRecipeObj(prevRecipeObj => (
            {
                ...prevRecipeObj,
                ingredients: prevRecipeObj.ingredients
                    .map(ingredient => 
                        ingredient.id === ingredientId ? 
                        { ...ingredient, selected: true } : 
                        { ...ingredient, selected: false }
                    )
            }

        ))
    }

    function handleClickIngredient(ingredientId) {
        selectIngredient(ingredientId)
        clearFormData()
    }
    
    return (
        <List.List>
            {
                ingredients => ingredients.map(ingredient => (
                    <li key={ingredient.id} onClick={() => handleClickIngredient(ingredient.id)}>
                        {
                            ingredient.selected ?
                            <EditIngredientEl ingredient={ingredient}/> :
                            <Card>
                                {getCapString(ingredient.name)}
                            </Card>
                        }
                    </li>
                ))
            }
        </List.List>
    )
}