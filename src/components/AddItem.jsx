import Card from "./Card"
import Form from "./Form"
import Button from "./Buttons/Button"
import { useStore } from "../store/store"

export default function AddItem({onSubmit = () => {}}) {
    const formData = useStore(state => state.formData)
    const setFormData = useStore(state => state.updateFormData)
    
    function handleChange(event) {
        const {name, value} = event.target
        
        setFormData({
            ...formData,
            [name]: value
        })
    }

    function handleSubmit() {
        setFormData({})
        onSubmit()
    }

    function handleClickClose() {
        setFormData(null)
    }
    
    return (
        <Form onSubmit={handleSubmit}>
            <Card className="grid grid-cols-6 gap-3">
                <input 
                    type="text" 
                    placeholder="Item.."
                    className="col-span-6 bg-white/15 rounded-lg px-2 py-1"
                    onChange={handleChange}
                    name="itemName"
                    value={formData?.itemName ? formData.itemName : ""}
                    required
                    autoFocus
                />
                <Button className="bg-green-900 col-span-5">
                    Add
                </Button>
                <Button 
                    className="bg-red-900" 
                    type="button"
                    onClick={handleClickClose}
                >
                    x
                </Button>
            </Card>
        </Form>
    )
}