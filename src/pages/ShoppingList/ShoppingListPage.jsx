import PageHeader from "../../components/PageHeader/PageHeader"
import ShoppingListEl from "./ShoppingListEl"
import ShoppingListMenu from "./ShoppingListMenu"
import AddItemForm from "./AddItemForm"
import { useAtomValue } from "jotai"
import { formDataAtom } from "../../store/store"
import LinkNav from "../../components/Links/LinkNav"
import Card from "../../components/Card"
import Button from "../../components/Buttons/Button"

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
                    formData ? <AddItemForm /> : <LinkNav to="recipes">Recipes</LinkNav>
                }
            </main>

            <dialog open>
                <div className="bg-white/10 backdrop-blur fixed inset-0 flex flex-col justify-center gap-4 px-4">
                    <Card className="text-white grid gap-4 px-2 pt-4 bg-black/50">
                        <p className="text-center">Are you sure?</p>
                        <div className="flex gap-2">
                            <Button className="flex-grow bg-green-900">Yes</Button>
                            <Button className="bg-red-900">No</Button>
                        </div>
                    </Card>
                </div>
            </dialog>
        </>
    )
}