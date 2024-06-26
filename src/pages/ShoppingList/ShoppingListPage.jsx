import PageHeader from "../../components/PageHeader/PageHeader"
import ShoppingListEl from "./ShoppingListEl"
import Menu from "./../../components/Menu/Menu"
import IconMore from "../../components/Icons/IconMore"
import ShoppingListMenu from "./ShoppingListMenu"
import Form from "../../components/Form"
import Card from "../../components/Card"
import Button from "../../components/Buttons/Button"
import AddItemCard from "../../components/AddItemCard"
import AddItemForm from "./AddItemForm"
import { useAtomValue } from "jotai"
import { formDataAtom } from "../../store/store"

export default function ShoppingListPage() {
    const formData = useAtomValue(formDataAtom)
    
    return (
        <>
            <PageHeader>
                <PageHeader.Title className="col-start-3 col-span-5">Shopping List</PageHeader.Title>
                <ShoppingListMenu />
            </PageHeader>
            <main className="mt-12 px-4 flex flex-col gap-4">
                <ShoppingListEl />
                {
                    formData && <AddItemForm />
                }

            </main>
        </>
    )
}