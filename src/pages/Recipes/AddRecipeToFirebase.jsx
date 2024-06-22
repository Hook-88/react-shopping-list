import AddItem from "../../components/AddItem"
import { collection, addDoc } from "firebase/firestore"
import { db } from "../../firebase/firebase"

export default function AddRecipeToFirebase() {

    async function addRecipeToFirebase() {
        const collectionRef = collection(db, "recipes")
        const recipeObj = {
            name: formData.itemName
        }

        await addDoc(collectionRef, recipeObj)
    }
    
    return <AddItem onSubmit={addRecipeToFirebase}/>
}