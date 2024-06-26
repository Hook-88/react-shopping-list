import PageHeader from "../../components/PageHeader/PageHeader"
import ShoppingListEl from "./ShoppingListEl"
import Menu from "./../../components/Menu/Menu"
import IconMore from "../../components/Icons/IconMore"
import ShoppingListMenu from "./ShoppingListMenu"
import Form from "../../components/Form"
import Card from "../../components/Card"
import Button from "../../components/Buttons/Button"
import AddItemCard from "../../components/AddItemCard"

export default function AddItemForm() {
    
    return (
        <Form>
            <AddItemCard placeholder="Item..." name="itemName"/>
        </Form>
    )
}