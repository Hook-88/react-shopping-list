import AddItem from "../../components/AddItem"
import { useStore } from "../../store/store"
import { addDoc, collection } from "firebase/firestore"
import { db } from "../../firebase/firebase"

export default function AddItemToShoppingList() {
    const formData = useStore(state => state.formData)

    async function addNewItemToShoppingList() {
        const itemObj = {
            name: formData.itemName,
            quantity: 1,
            selected: false
        }

        await addDoc(collection(db, "shoppingList"), itemObj)
    }
    
    return <AddItem onSubmit={addNewItemToShoppingList}/>
}