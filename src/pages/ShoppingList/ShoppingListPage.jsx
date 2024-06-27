import PageHeader from "../../components/PageHeader/PageHeader"
import ShoppingListEl from "./ShoppingListEl"
import ShoppingListMenu from "./ShoppingListMenu"
import AddItemForm from "./AddItemForm"
import { useAtomValue, useAtom } from "jotai"
import { confirmDialogAtom, formDataAtom, shoppingListAtom } from "../../store/store"
import LinkNav from "../../components/Links/LinkNav"
import ConfirmDialog from "../../components/ConfirmDialog"
import Button from "../../components/Buttons/Button"
import AddItemEl from "./AddItemEl"

export default function ShoppingListPage() {
    const [formData, setFormData] = useAtom(formDataAtom)
    const dialogObj = useAtomValue(confirmDialogAtom) 
    const shoppingListLength = useAtomValue(shoppingListAtom)?.length - 1

    function handleClickStartAddingItems() {
        setFormData(true)
    }


    return (
        <>
            <PageHeader>
                <PageHeader.Title className="col-start-3 col-span-5">Shopping List</PageHeader.Title>
                <ShoppingListMenu />
            </PageHeader>
            <main className="mt-12 px-4 flex flex-col gap-4">
                {
                    shoppingListLength > 0 && <ShoppingListEl />
                }
                {
                    !formData && shoppingListLength === 0 && 
                        <Button className="py-4 bg-green-900" onClick={handleClickStartAddingItems}>
                            Click to start adding items
                        </Button>
                        // <AddItemForm />
                }
                {/* TODO add populair list */}
                {
                    formData ? <AddItemEl /> : 
                        <LinkNav to="recipes">Recipes</LinkNav>
                }
            </main>

            {
                dialogObj && <ConfirmDialog />
            }

            
        </>
    )
}