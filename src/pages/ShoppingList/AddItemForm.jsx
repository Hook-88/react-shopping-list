import Form from "../../components/Form"
import AddItemCard from "../../components/AddItemCard"
import { addDoc, collection, doc, getDoc, getDocs, updateDoc, query, where } from "firebase/firestore"
import { db } from "../../firebase/firebase"
import { useAtom } from "jotai"
import { formDataAtom } from "../../store/store"

export default function AddItemForm() {
    const [formData, setFormData] = useAtom(formDataAtom)

    function handleSubmit() {
        addItemToFirebase()
        updateHistory()
        setFormData({itemName: ""})
    }

    async function addItemToFirebase() {
        const collectionRef = collection(db, "shoppingList")
        const itemObj = {
            name: formData.itemName.trim().toLowerCase(),
            quantity: 1,
            selected: false
        }

        await addDoc(collectionRef, itemObj)
    }

    async function updateHistory() {
        const collectionRef = collection(db, "shoppingList/history/items")
        const q = query(collectionRef, where("name", "==", formData.itemName.trim().toLowerCase()))
        const querySnapshot = await getDocs(q)

        const docsArr = []
        querySnapshot.forEach(doc => docsArr.push(doc.id))

        if (!docsArr[0]) {
            addItemToHistory()

            return
        }

        modifyQuantityHistoryItem(docsArr[0])
    }

    async function addItemToHistory() {
        const collectionRef = collection(db, "shoppingList/history/items")
        const itemObj = {
            name: formData.itemName.trim().toLowerCase(),
            quantity: 1
        }

        await addDoc(collectionRef, itemObj)
    }

    async function modifyQuantityHistoryItem(historyItemId) {
        const docRef = doc(db, "shoppingList/history/items", historyItemId)
        const docSnap = await getDoc(docRef)

        await updateDoc(docRef, {quantity: docSnap.data().quantity + 1})
    }
    
    return (
        <Form onSubmit={handleSubmit}>
            <AddItemCard placeholder="Item..." name="itemName"/>
        </Form>
    )
}