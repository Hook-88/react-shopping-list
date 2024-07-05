import { useAtom, useAtomValue } from "jotai"
import { confirmDialogAtom, pageFormsOpenAtom, shoppingListAtom } from "../../store/store"
import ListShoppingListEl from "./ListShoppingListEl"
import AddItemEl from "./AddItemEl"
import MenuShoppingListPage from "./MenuShoppingListPage"
import ConfirmDialog from "../../components/ConfirmDialog.jsx/ConfirmDialog"

export default function ShoppingListPage() {
    const shoppingList = useAtomValue(shoppingListAtom)
    const formOn = useAtomValue(pageFormsOpenAtom)
    const openConfirmDialog = useAtomValue(confirmDialogAtom)

    return (
        <>
            <header className="bg-white/10 py-2 grid grid-cols-6 px-4">
                <h1 className="text-center text-lg font-bold col-span-4 col-start-2">Shoping List</h1>
                <MenuShoppingListPage />
            </header>
            <main className="p-4 flex flex-col gap-4">
                { shoppingList && <ListShoppingListEl /> }
                { formOn && <AddItemEl /> }
            </main>
            {
                openConfirmDialog && <ConfirmDialog />
            }
        </>
    )
}