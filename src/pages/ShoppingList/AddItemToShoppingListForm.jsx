import Card from "../../components/Card"
import Button from "../../components/Buttons/Button"
import Form from "../../components/Form"
import { useContext } from "react"
import { FormContext } from "./../../Context/FormContextComponent"
import { ShoppingListContext } from "./ShoppingListContextComponent"

export default function AddItemToShoppingListForm() {
    const { formData, handleChange, clearFormData, openForm } = useContext(FormContext)
    const { addItemToShoppingListInFirebase } = useContext(ShoppingListContext)

    function handleOnChange(event) {
        handleChange(event)
    }

    function handleClick() {
        clearFormData()
    }

    function handleSubmit() {
        addItemToShoppingListInFirebase(formData.itemName)
        openForm()
    }
    
    return (         
        <Form className="grid grid-col-6 gap-3" onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="items.."
                className="col-span-6 bg-white/15 rounded-lg px-2 py-1"
                name="itemName"
                onChange={handleOnChange}
                value={formData?.itemName ? formData.itemName : ""}
                required
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
    )
}