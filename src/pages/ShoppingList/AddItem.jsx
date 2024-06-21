import Card from "../../components/Card"
import Form from "../../components/Form"
import Button from "../../components/Buttons/Button"
import { useStore } from "../../store/store"

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
    
    return (
        <Form onSubmit={handleSubmit}>
            <Card className="grid grid-cols-6 gap-2">
                <input 
                    type="text" 
                    placeholder="Item.."
                    className="col-span-5 bg-white/15 rounded-lg px-2 py-1"
                    onChange={handleChange}
                    name="itemName"
                    value={formData.itemName ? formData.itemName : ""}
                    required
                />
                <Button className="bg-sky-900">
                    Add
                </Button>
                <Button className="col-span-6 bg-green-900" type="button">
                    I'm done adding items
                </Button>
            </Card>
        </Form>
    )
}