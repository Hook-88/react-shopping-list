import AddItem from "../../components/AddItem"
import { collection, addDoc } from "firebase/firestore"
import { db } from "../../firebase/firebase"
import { useStore } from "../../store/store"

export default function AddRecipeToFirebase() {
    const formData = useStore(state => state.formData)

    async function addRecipeToFirebase() {
        const collectionRef = collection(db, "recipes")
        const recipeObj = {
            name: formData.itemName
        }

        await addDoc(collectionRef, recipeObj)
    }
    
    return <AddItem onSubmit={addRecipeToFirebase}/>
}