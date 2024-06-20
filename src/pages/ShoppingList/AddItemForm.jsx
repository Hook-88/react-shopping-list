import Card from "../../components/Card"
import Form from "../../components/Form"
import Button from "../../components/Buttons/Button"
import { useSetAtom } from "jotai"
import { addNewItemAtom } from "../../store/store"

export default function AddItemForm() {
    const setAddNewItemOn = useSetAtom(addNewItemAtom)

    function closeForm() {
        setAddNewItemOn(false)
    }
    
    return (
        <Card>
            <Form className="grid grid-cols-6 gap-2">
                <input 
                    type="text" 
                    placeholder="Item..."
                    className="px-2 py-1 rounded-lg bg-white/10 col-span-6 mb-2"
                    autoFocus
                />
                <select name="" id="" className="col-span-3 bg-white/10 rounded-lg px-1">
                    <option value="">General</option>
                </select>
                <Button 
                    type="button" 
                    className="col-start-5 bg-red-900"
                    onClick={closeForm}
                >
                    Canc

                </Button>
                <Button className="bg-green-900">Add</Button>
            </Form>
        </Card>
    )
}