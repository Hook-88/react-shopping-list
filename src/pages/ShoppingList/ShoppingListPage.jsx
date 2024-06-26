import PageHeader from "../../components/PageHeader/PageHeader"
import ShoppingListEl from "./ShoppingListEl"
import ShoppingListMenu from "./ShoppingListMenu"
import AddItemForm from "./AddItemForm"
import { useAtomValue } from "jotai"
import { formDataAtom } from "../../store/store"
import LinkNav from "../../components/Links/LinkNav"

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
                <LinkNav>Recipes</LinkNav>
            </main>
        </>
    )
}