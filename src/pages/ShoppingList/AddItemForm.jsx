import PageHeader from "../../components/PageHeader/PageHeader"
import ShoppingListEl from "./ShoppingListEl"
import Menu from "./../../components/Menu/Menu"
import IconMore from "../../components/Icons/IconMore"
import ShoppingListMenu from "./ShoppingListMenu"
import Form from "../../components/Form"
import Card from "../../components/Card"
import Button from "../../components/Buttons/Button"
import AddItemCard from "../../components/AddItemCard"
import { addDoc, collection } from "firebase/firestore"
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

    function handleSubmit() {
        addItemToFirebase()
        setFormData({itemName: ""})
    }
    
    return (
        <Form onSubmit={handleSubmit}>
            <AddItemCard placeholder="Item..." name="itemName"/>
        </Form>
    )
}