import Form from "../components/Form"
import { IoClose } from "react-icons/io5"

export default function AddItemForm() {
    
    return (
        <Form>
            <input type="text" placeholder="name" className="col-span-6 text-center bg-white/10 rounded-lg py-2 mb-2"/>
            <select className="col-span-3 bg-white/10 rounded-lg p-2">
                <option value="general">General</option>
            </select>
            <button type="button" className="col-start-5 bg-red-900 rounded-lg text-2xl flex items-center justify-center">
                <IoClose />
            </button>
            <button type="submit" className="bg-green-900 rounded-lg">Add
                
            </button>
        </Form>
    )
}