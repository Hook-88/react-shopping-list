import Card from "../components/Card"
import Form from "../components/Form"
import Button from "../components/Buttons/Button"
import { atom, useAtom } from "jotai"
import { useState } from "react"
import { IoClose } from "react-icons/io5"

export const AddItemCardAtom = atom(false)

export default function AddItemCard({onSubmit = () => {}}) {
    const [open, setOpen] = useAtom(AddItemCardAtom)
    const [formData, setFormData] = useState({})

    function handleChange(event) {
        const { name, value } = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }))
    }

    function handleClickCancel() {
        setOpen(false)
        setFormData({})
    }

    function handleSubmit() {
        onSubmit(formData.itemName)
        setFormData({})
    }
    
    return (
        open ?
        <Card>
            <Form className="grid gap-4 grid-cols-6" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="itemName"
                    placeholder="item..."
                    className="py-2 px-4 text-center rounded-lg bg-white/15 col-span-6"
                    autoFocus
                    onChange={handleChange} 
                    value={formData?.itemName ? formData.itemName : ""}
                />
                <Button 
                    className="bg-red-900 col-span-1 text-2xl flex items-center justify-center"
                    type="button"
                    onClick={handleClickCancel}
                >
                    <span>
                        <IoClose />
                    </span>
                </Button>
                <Button className="bg-green-900 col-span-5 col-start-2">
                    Add
                </Button>
            </Form>
        </Card> : null
    )
}