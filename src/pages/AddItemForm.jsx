import { useState } from "react"
import Form from "../components/Form"
import { IoClose } from "react-icons/io5"
import { atom, useAtom } from "jotai"

export const addItemAtom = atom(false)

export default function AddItemForm({onSubmit = () => {}}) {
    const [formData, setFormData] = useState({})
    const [open, setOpen] = useAtom(addItemAtom)

    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => {

            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    function handleSubmit() {
        onSubmit(formData.itemName)
        setFormData({})
    }
    
    return (
        open ?
        <Form onSubmit={handleSubmit}>
            <input 
                type="text" 
                placeholder="name" 
                className="col-span-6 text-center bg-white/10 rounded-lg py-2 mb-2"
                name="itemName"
                value={formData.itemName ? formData.itemName : ""}
                onChange={handleChange}
                autoFocus
            />
            <select 
                className="col-span-3 bg-white/10 rounded-lg p-2"
                name="list"
            >
                <option value="general">General</option>
            </select>

            <button 
                type="button" 
                className="col-start-5 bg-red-900 rounded-lg text-2xl flex items-center justify-center py-1 border border-white/35"
                onClick={() => setOpen(false)}
            >
                <IoClose />
            </button>

            <button type="submit" className="bg-green-900 rounded-lg py-2 border border-white/35">
                Add
            </button>
        </Form> : null
    )
}