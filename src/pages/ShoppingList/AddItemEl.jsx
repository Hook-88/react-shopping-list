import { useSetAtom } from "jotai"
import { pageFormsOpenAtom } from "../../store/store"
import { useForm } from "react-hook-form"
import { addDoc, collection } from "firebase/firestore"
import { db } from "../../firebase"
import { logAddItem } from "../../utility/firestoreFn/logAddItem"
import AdditemListPopularItems from "./AdditemListPopularItems"
import addItemToFirebase from "../../utility/firestoreFn/addFirebaseItem"


export default function AddItemEl({popularitemsArr}) {
    const openForm = useSetAtom(pageFormsOpenAtom)
    
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            itemName: ""
        }
    })

    function sendFormData(formData) {
        const itemObj = {
            name: formData.itemName.trim().toLowerCase(),
            quantity: 1,
            selected: false
        }
        addItemToFirebase(itemObj.name)
        logAddItem(itemObj.name)
        reset()
    }

    function closeForm() {
        openForm(false)
    }
    
    return (
        <div className="bg-white/10 p-2 rounded-md">
            <AdditemListPopularItems populairItems={popularitemsArr}/>
            <form className="grid gap-2" onSubmit={handleSubmit(sendFormData)}>
                <input 
                    type="text" 
                    className="py-1 px-2 rounded-md bg-white/10"
                    placeholder="Item..."
                    {...register("itemName")}
                    required
                    autoFocus
                />
                <div className="flex gap-2">
                    <button 
                        className="flex-grow py-1 bg-green-900 rounded-md border border-white/10"
                    >
                        Add
                    </button>
                    <button 
                        className="px-2 bg-red-900 rounded-md border border-white/10" 
                        type="button"
                        onClick={closeForm}
                    >
                        Close
                    </button>
                </div>
            </form>
        </div>
    )
}