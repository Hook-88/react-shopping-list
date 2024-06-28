import { useContext } from "react"
import PageHeader from "../../components/PageHeader/PageHeader"
import { ShoppingListContext } from "./ShoppingListContextComponent"
import ListShoppingListEl from "./ListShoppingListEl"
import ShoppingListMenu from "./ShoppingListMenu"
import AddItemToShoppingListEl from "./AddItemToShoppingListEl"
import { FormContext } from "../../Context/FormContextComponent"
import DialogConfirmEl from "../../components/DialogConfirm/DialogConfirmEl"
import { DialogConfirmContext } from "../../components/DialogConfirm/DialogConfirm"
import LinkNav from "../../components/Links/LinkNav"


export default function ShoppingListPage() {
    const { shoppingList } = useContext(ShoppingListContext)
    const { formData, clearFormData } = useContext( FormContext )
    const { dialogObj } = useContext(DialogConfirmContext)

    function handleClickLink() {
        clearFormData()
    }

    return (
        <>
            <PageHeader>
                <PageHeader.Title className="col-start-3 col-span-5">Shopping List</PageHeader.Title>
                <ShoppingListMenu />
            </PageHeader>
            {
                shoppingList &&
                <main className="mt-12 px-4 flex flex-col gap-4">
                    <ListShoppingListEl />
                    { (formData || shoppingList.length === 0) && <AddItemToShoppingListEl /> }

                    <LinkNav to="recipes" onClick={handleClickLink}>Recipes</LinkNav>
                </main>
            }
                {
                    dialogObj && <DialogConfirmEl />
                }
            
            
        </>
    )
}