import { collection, addDoc } from "firebase/firestore"
import AddItem from "../../components/AddItem"
import { db } from "../../firebase/firebase"
import { useParams } from "react-router-dom"
import { useStore } from "../../store/store"

export default function AddIngredientToFirebase() {
    const { recipeId } = useParams()
    const formData = useStore(state => state.formData)

    async function addIngredientToFirebase() {
        const collectionRef = collection(db, `recipes/${recipeId}/ingredients`)
        const obj = {
            name: formData.itemName,
            optional: false
        }
        
        await addDoc(collectionRef, obj)
    }
    
    return <AddItem onSubmit={addIngredientToFirebase}/>
}