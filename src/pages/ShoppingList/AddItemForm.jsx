import PageHeader from "../../components/PageHeader/PageHeader"
import ShoppingListEl from "./ShoppingListEl"
import Menu from "./../../components/Menu/Menu"
import IconMore from "../../components/Icons/IconMore"
import ShoppingListMenu from "./ShoppingListMenu"
import Form from "../../components/Form"
import Card from "../../components/Card"
import Button from "../../components/Buttons/Button"
import AddItemCard from "../../components/AddItemCard"
import { addDoc, collection, doc, getDoc, getDocs, updateDoc, query, where } from "firebase/firestore"
import { db } from "../../firebase/firebase"
import { useAtom } from "jotai"
import { formDataAtom } from "../../store/store"

export default function AddItemForm() {
    const [formData, setFormData] = useAtom(formDataAtom)

    async function addItemToFirebase() {
        const collectionRef = collection(db, "shoppingList")
        const itemObj = {
            name: formData.itemName.trim().toLowerCase(),
            quantity: 1,
            selected: false
        }

        await addDoc(collectionRef, itemObj)
    }

    async function modifyQuantityHistoryItem(historyItemId) {
        const docRef = doc(db, "shoppingList/history/items", historyItemId)
        const docSnap = await getDoc(docRef)

        await updateDoc(docRef, {quantity: docSnap.data().quantity + 1})
    }

    async function addItemToHistory() {
        const collectionRef = collection(db, "shoppingList/history/items")
        const itemObj = {
            name: formData.itemName.trim().toLowerCase(),
            quantity: 1
        }

        await addDoc(collectionRef, itemObj)
    }

    async function updateHistory() {
        const collectionRef = collection(db, "shoppingList/history/items")
        const q = query(collectionRef, where("name", "==", formData.itemName.trim().toLowerCase()))
        const querySnapshot = await getDocs(q)

        const docsArr = []
        querySnapshot.forEach(doc => docsArr.push(doc.id))

        // console.log(docsArr[0])

        if (!docsArr[0]) {
            addItemToHistory()

            return
        }

        modifyQuantityHistoryItem(docsArr[0])

    }

    // async function getHistoryItemId(itemName) {
    //     const collectionRef = collection(db, "shoppingList/history/items")
    //     const q = query(collectionRef, where("name", "==", itemName))
    //     const querySnapshot = await getDocs(q)


    // }

    function handleSubmit() {
        addItemToFirebase()
        updateHistory()
        setFormData({itemName: ""})
    }
    
    return (
        <Form onSubmit={handleSubmit}>
            <AddItemCard placeholder="Item..." name="itemName"/>
        </Form>
    )
}