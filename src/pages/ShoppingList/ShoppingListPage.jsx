import PageHeader from "../../components/PageHeader/PageHeader"
import ShoppingListEl from "./ShoppingListEl"
import ShoppingListMenu from "./ShoppingListMenu"
import AddItemForm from "./AddItemForm"
import { useAtom, useAtomValue } from "jotai"
import { confirmDialogAtom, formDataAtom } from "../../store/store"
import LinkNav from "../../components/Links/LinkNav"
import Card from "../../components/Card"
import Button from "../../components/Buttons/Button"
import { useRef } from "react"
import ConfirmDialog from "../../components/ConfirmDialog"

export default function ShoppingListPage() {
    const formData = useAtomValue(formDataAtom)
    const [dialogObj, setDialogObj] = useAtom(confirmDialogAtom) 
    
    function showDialogConfirm() {
        setDialogObj({
            question: "Delete checked items?",
        })
    }

    return (
        <>
            <PageHeader>
                <PageHeader.Title className="col-start-3 col-span-5">Shopping List</PageHeader.Title>
                <ShoppingListMenu />
            </PageHeader>
            <main className="mt-12 px-4 flex flex-col gap-4">
                <ShoppingListEl />
                {
                    formData ? <AddItemForm /> : <LinkNav to="recipes">Recipes</LinkNav>
                }
            </main>

            {
                dialogObj && <ConfirmDialog />
            }

            
        </>
    )
}