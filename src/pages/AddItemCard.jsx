import Card from "../components/Card"
import Form from "../components/Form"
import Button from "../components/Buttons/Button"
import { atom, useAtom } from "jotai"

export const AddItemCardAtom = atom(false)

export default function AddItemCard() {
    const [open, setOpen] = useAtom(AddItemCardAtom)
    
    return (
        open ?
        <Card>
            <Form className="grid gap-4 grid-cols-6">
                <input 
                    type="text" 
                    name="itemName"
                    placeholder="item..."
                    className="py-2 px-4 text-center rounded-lg bg-white/15 col-span-6" 
                />
                <Button 
                    className="bg-red-900 col-span-3"
                    type="button"
                    onClick={() => setOpen(false)}
                >
                    Cancel
                </Button>
                <Button className="bg-green-900 col-span-3">
                    Add
                </Button>
            </Form>
        </Card> : null
    )
}