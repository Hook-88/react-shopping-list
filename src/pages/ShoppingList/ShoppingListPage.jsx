import { useAtom, useAtomValue } from "jotai"
import { confirmDialogAtom, pageFormsOpenAtom } from "../../store/store"
import ListShoppingListEl from "./ListShoppingListEl"
import AddItemEl from "./AddItemEl"
import MenuShoppingListPage from "./MenuShoppingListPage"
import ConfirmDialog from "../../components/ConfirmDialog.jsx/ConfirmDialog"
import usePopularItems from "../../hooks/usePopularItems"
import { useEffect } from "react"
import useShoppingListItems from "../../hooks/useShoppingListItems"
import NavLinkTo from "../../components/Links/NavLinkTo"
import PageHeader from "../../components/PageHeader/PageHeader"
import PageMain from "../../components/PageMain/PageMain"


export default function ShoppingListPage() {
    const shoppingList = useShoppingListItems()
    const [formOn, setFormOn] = useAtom(pageFormsOpenAtom)
    const openConfirmDialog = useAtomValue(confirmDialogAtom)
    const popularItems = usePopularItems()

    useEffect(() => {

        if (shoppingList?.length === 0) {
            setFormOn(true)
        }

    }, [shoppingList])

    return (
        <>
            <PageHeader>
                <PageHeader.Title>Shoping List</PageHeader.Title>
                <MenuShoppingListPage />
            </PageHeader>
            <PageMain>
                { shoppingList?.length > 0 && <ListShoppingListEl /> }
                { formOn && <AddItemEl popularitemsArr={popularItems} /> }
                <NavLinkTo to="recipes">
                    Recipes
                </NavLinkTo>
            </PageMain>
            { openConfirmDialog && <ConfirmDialog /> }
        </>
    )
}