import Card from "../../components/Card"
import Form from "../../components/Form"
import Button from "../../components/Buttons/Button"
import { useSetAtom } from "jotai"
import { addNewItemAtom } from "../../store/store"
import { useEffect, useState } from "react"
import { onSnapshot, collection } from "firebase/firestore"
import { db } from "../../firebase/firebase"

export default function AddItemForm({onSubmit = () => {}}) {
    const [lists, setLists] = useState([])
    const [formData, setFormData] = useState() 
    const setAddNewItemOn = useSetAtom(addNewItemAtom)

    function closeForm() {
        setAddNewItemOn(false)
    }

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
        onSubmit(formData)
        console.log("submitted")

    }

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "shoppingList"), snapshot => {
            //sync with local state
            const newArr = snapshot.docs.map(doc => (
                {
                    ...doc.data(),
                    id: doc.id
                }
            ))

            setLists(newArr)            
        })

        return unsub
    }, [])

    useEffect(() => {
        setFormData(prevFormData => {

            return {
                ...prevFormData,
                listId: lists[0]?.id
            }
        })

    }, [lists])
    
    return (
        <Card>
            <Form className="grid grid-cols-6 gap-2" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Item..."
                    className="px-2 py-1 rounded-lg bg-white/10 col-span-6 mb-2"
                    autoFocus
                    name="itemName"
                    onChange={handleChange}
                    value={formData?.itemName ? formData.itemName : ""}
                />
                <select 
                    name="listId" 
                    className="col-span-3 bg-white/10 rounded-lg px-1"
                    value={formData?.listId ? formData.listId : ""
                    }
                    onChange={handleChange}
                >
                    {
                        lists.map(list => (
                            <option key={list.id} value={list.id}>
                                {list.name.toUpperCase()}
                            </option>
                        ))
                    }
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