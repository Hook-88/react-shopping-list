import { useContext } from "react"
import { RecipeContext } from "../Recipe/RecipeState"
import Card from "../../components/Card"
import List from "../../components/List/List"
import { useParams } from "react-router-dom"
import Form from "../../components/Form"
import Button from "../../components/Buttons/Button"
import { FormContext } from "../../Context/FormContextComponent"
import InputCheckbox from "../../components/InputCheckbox"
import { addDoc, collection } from "firebase/firestore"
import { db } from "../../firebase/firebase"
import getCapString from "../../utility/getCapString"

export default function AddIngredientEl() {
    const {recipeId} = useParams()
    const { formData, handleChange, clearFormData, openForm } = useContext(FormContext)
    const {
        recipeObj, 
        updateRecipeObj, 
        clearRecipeObj, 
        setIngredientsSelect
    
    } = useContext(RecipeContext)

    function handleClickClose() {
        clearFormData()
    }

    function handleOnChange(event) {
        handleChange(event)
    }

    async function addIngredientToFirebase() {
        const collectionRef = collection(db, `recipes/${recipeId}/ingredients`)
        const ingredientObj = {
            name: formData.ingredientName,
            optional: formData?.optional === undefined ? false : formData.optional
        }

        await addDoc(collectionRef, ingredientObj)
    }

    // console.log(formData)

    
    return (
        <Card className="px-2">
            <Form className="flex flex-col gap-3" onSubmit={addIngredientToFirebase}>
                <div className="flex gap-3">
                    <input 
                        type="text" 
                        placeholder="Items..."
                        className="bg-white/15 rounded-lg px-2 py-1 flex-grow"
                        name="ingredientName"
                        onChange={handleOnChange}
                        value={formData?.ingredientName ? getCapString(formData.ingredientName) : ""}
                        required
                        autoFocus
                    />
                    <InputCheckbox />

                </div>
                <div className="flex gap-3">
                    <Button className="bg-green-900 flex-grow">
                        Add
                    </Button>

                    <Button 
                        className="bg-red-900" 
                        type="button"
                        onClick={handleClickClose}
                    >
                        x
                    </Button>
                </div>
            </Form>
        </Card> 
    )
}