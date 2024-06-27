import { useAtom } from "jotai"
import { formDataAtom } from "../../store/store"
import ListPopularItemsInline from "./ListPopularItemsInline"
import Card from "../../components/Card"
import Button from "../../components/Buttons/Button"

export default function AddItemFormCard() {
    const [formData, setFormData] = useAtom(formDataAtom)

    function handleClick() {
        //to close form
        setFormData(null)
    }

    function handleChange(event) {
        const {name, value} = event.target

        setFormData(prevFormData => ({...prevFormData, [name]: value}))
    }
    
    return (
        <Card className="grid grid-cols-6 gap-3 px-2">
            <ListPopularItemsInline />
            <input 
                type="text" 
                placeholder="Item"
                className="col-span-6 bg-white/15 rounded-lg px-2 py-1"
                name="itemName"
                onChange={handleChange}
                value={formData?.itemName ? formData.itemName : ""}
                autoFocus
                required
            />
            <Button className="bg-green-900 col-span-5">
                Add
            </Button>
            <Button 
                className="bg-red-900" 
                type="button"
                onClick={handleClick}
            >
                x
            </Button>
        </Card>
    )
}