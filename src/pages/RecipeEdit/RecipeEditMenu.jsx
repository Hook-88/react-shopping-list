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
import AddIngredientEl from "./AddIngredientEl"

export default function RecipeEditMenu() {
    const {recipeId} = useParams()
    const { formData, handleChange, clearFormData, openForm } = useContext(FormContext)
    const {
        recipeObj, 
        updateRecipeObj, 
        clearRecipeObj, 
        setIngredientsSelect
    
    } = useContext(RecipeContext)

    function handleClickAdd() {
        openForm()
    }

    return (
        <Menu className="col-span-2">
            <Menu.Button className="flex items-center justify-end pr-4">
                <IconMore className="px-1"/>
            </Menu.Button>
            <Menu.Dropdown>
                <Menu.Item onClick={handleClickAdd}>
                    Add ingredient
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}