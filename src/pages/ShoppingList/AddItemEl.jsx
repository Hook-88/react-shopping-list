import { useAtomValue, useSetAtom } from "jotai"
import { pageFormsOpenAtom, shoppingListAtom } from "../../store/store"
import { useForm } from "react-hook-form"
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, orderBy, where } from "firebase/firestore"
import { db } from "../../firebase"
import { logAddItem } from "../../utility/firestoreFn/logAddItem"
import { useEffect, useState } from "react"
import getStringFirstCharCap from "../../utility/getStringFirstCharCap"

export default function AddItemEl() {
    const shoppingList = useAtomValue(shoppingListAtom)
    const [populairItems, setPopularItems] = useState(null)
    const openForm = useSetAtom(pageFormsOpenAtom)
    
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            itemName: ""
        }
    })

    async function getPopularFirebaseItems() {
        const collectionRef = collection(db, "history/shoppingList/items")
        const q = query(collectionRef, where("quantity", ">", 1), orderBy("quantity", "desc"))
        
        const popularItemsArr = await getDocs(q)
        const popularUniqueItemsArr = popularItemsArr.docs
            .filter(doc => {
            
                const itemNameArr = shoppingList.map(item => item.name)

                if (!itemNameArr.includes(doc.data().name)) {
                    
                    return doc
                }
            })
            .map(doc => ({...doc.data(), id: doc.id}))

        setPopularItems(popularUniqueItemsArr.slice(0, 5))
    }

    useEffect(() => {
        getPopularFirebaseItems()

    }, [shoppingList])

    function sendFormData(formData) {
        const itemObj = {
            name: formData.itemName.trim().toLowerCase(),
            quantity: 1,
            selected: false
        }
        addItemToFirebase(itemObj.name)
        logAddItem(itemObj)
        reset()
    }

    function handleClick(itemName) {
        addItemToFirebase(itemName)
    }

    function closeForm() {
        openForm(false)
    }

    async function addItemToFirebase(itemName) {
        const itemObj = {
            name: itemName.trim().toLowerCase(),
            quantity: 1,
            selected: false
        }
        const collectionRef = collection(db, "shoppingList")
        
        await addDoc(collectionRef, itemObj)
    }
    
    return (
        <div className="bg-white/10 p-2 rounded-md">
            <ul className="flex flex-wrap-reverse gap-2 mb-4">
                {
                    populairItems?.map(item => (
                        <li 
                            key={item.id}
                            className="p-2 px-4 border border-white/30 flex-grow text-center rounded-md"
                            onClick={() => handleClick(item.name)}
                        >
                            {getStringFirstCharCap(item.name)}
                        </li>
                    ))
                }
            </ul>
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