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
import RecipeEditPageHeader from "./RecipeEditPageHeader"
import getCapString from "../../utility/getCapString"
import Form from "../../components/Form"
import Button from "../../components/Buttons/Button"
import { editIngredientFormAtom } from "../../store/store"
import { useAtom } from "jotai"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase/firebase"


export default function EditRecipeNameEl() {
    const { recipeId } = useParams()
    const [formRecipeNameData, setFormRecipeNameData] = useAtom(editIngredientFormAtom)

    function handleOnChange(event) {
        const {name, value} = event.target

        setFormRecipeNameData(prevRecipeNameData => ({...prevRecipeNameData, [name]: value}))
    }

    function handleClickClose() {
        setFormRecipeNameData({recipeName: null})
    }
    
    async function handleSubmit() {
        const docRef = doc(db, "recipes", recipeId)

        await updateDoc(docRef, {name: formRecipeNameData.recipeName.trim().toLowerCase()})
        setFormRecipeNameData({recipeName: null})
    }

    return (
        <Card className="px-2">
            <Form className="grid grid-col-6 gap-3" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Recipe name..."    
                    className="col-span-6 bg-white/15 rounded-lg px-2 py-1"
                    name="recipeName"
                    onChange={handleOnChange}
                    value={formRecipeNameData?.recipeName ? getCapString(formRecipeNameData.recipeName) : ""}
                    required
                    autoFocus
                />
                <Button className="bg-green-900 col-span-5">
                    Save
                </Button>
                <Button 
                    className="bg-red-900 p-0" 
                    type="button"
                    onClick={handleClickClose}
                >
                    x
                </Button>
            </Form>
        </Card>
    )
}