import Card from "./Card"
import Button from "./Buttons/Button"
import { useAtom } from "jotai"
import { formDataAtom } from "../store/store"

export default function AddItemCard({placeholder = "", name = "itemName"}) {
    const [formData, setFormData] = useAtom(formDataAtom)

    function handleClick() {
        setFormData(null)
    }
    
    return (
        <Card className="grid grid-cols-6 gap-3 px-2">
            <input 
                type="text" 
                placeholder={placeholder}
                className="col-span-6 bg-white/15 rounded-lg px-2 py-1"
                name={name}

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