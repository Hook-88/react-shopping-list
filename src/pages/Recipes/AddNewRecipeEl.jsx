import Button from "../../components/Buttons/Button"
import Form from "../../components/Form"
import { useContext } from "react"
import { FormContext } from "./../../Context/FormContextComponent"
import { ShoppingListContext } from "./../ShoppingList/ShoppingListContextComponent"
import getCapString from "../../utility/getCapString"
import Card from "../../components/Card"
import { addDoc, collection } from "firebase/firestore"
import { db } from "../../firebase/firebase"

export default function AddNewRecipeEl() {
    const { formData, handleChange, clearFormData, openForm } = useContext(FormContext)
    const { addItemToShoppingListInFirebase } = useContext(ShoppingListContext)

    function handleOnChange(event) {
        handleChange(event)
    }

    function handleClick() {
        clearFormData()
    }

    function handleSubmit() {
        // addItemToShoppingListInFirebase(formData.itemName)
        addRecipeToFirebase()
        openForm()
    }

    async function addRecipeToFirebase() {
        const collectionRef = collection(db, "recipes")
        const recipeObj = {
            name: formData.recipeName.trim().toLowerCase(),
        }

        await addDoc(collectionRef, recipeObj)
    }
    
    return (
        <Card className="px-2">
            <Form className="grid grid-col-6 gap-3" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Items..."
                    className="col-span-6 bg-white/15 rounded-lg px-2 py-1"
                    name="recipeName"
                    onChange={handleOnChange}
                    value={formData?.recipeName ? getCapString(formData.recipeName) : ""}
                    required
                    autoFocus
                />
                <Button className="bg-green-900 col-span-5">
                    Add
                </Button>
                <Button 
                    className="bg-red-900 p-0" 
                    type="button"
                    onClick={handleClick}
                >
                    x
                </Button>
            </Form>
        </Card>         
    )
}