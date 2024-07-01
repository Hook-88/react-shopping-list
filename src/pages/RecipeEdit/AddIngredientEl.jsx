import PageHeader from "../../components/PageHeader/PageHeader"
import LinkNavBack from "../../components/Links/LinkNavBack"
import { useContext } from "react"
import { RecipeContext } from "../Recipe/RecipeState"
import Card from "../../components/Card"
import List from "../../components/List/List"
import { useParams } from "react-router-dom"
import getCapString from "../../utility/getCapString"
import Menu from "../../components/Menu/Menu"
import IconMore from "../../components/Icons/IconMore"
import Form from "../../components/Form"
import Button from "../../components/Buttons/Button"
import { FormContext } from "../../Context/FormContextComponent"

export default function AddIngredientEl() {
    const {recipeId} = useParams()
    const { formData, handleChange, clearFormData, openForm } = useContext(FormContext)
    const {
        recipeObj, 
        updateRecipeObj, 
        clearRecipeObj, 
        setIngredientsSelect
    
    } = useContext(RecipeContext)

    updateRecipeObj(recipeId)
    
    return (
        <Card className="px-2">
            <Form className="grid grid-col-6 gap-3">
                <input 
                    type="text" 
                    placeholder="Items..."
                    className="col-span-6 bg-white/15 rounded-lg px-2 py-1"
                    name="recipeName"
                    // onChange={handleOnChange}
                    // value={formData?.recipeName ? getCapString(formData.recipeName) : ""}
                    required
                    autoFocus
                />
                <Button className="bg-green-900 col-span-5">
                    Add
                </Button>
                <Button 
                    className="bg-red-900 p-0" 
                    type="button"
                >
                    x
                </Button>
            </Form>
        </Card> 
    )
}