import { useAtom, useAtomValue } from "jotai"
import { confirmDialogAtom, pageFormsOpenAtom } from "../../store/store"
import ListShoppingListEl from "./ListShoppingListEl"
import AddItemEl from "./AddItemEl"
import MenuShoppingListPage from "./MenuShoppingListPage"
import ConfirmDialog from "../../components/ConfirmDialog.jsx/ConfirmDialog"
import usePopularItems from "../../hooks/usePopularItems"
import { useEffect } from "react"
import useShoppingListItems from "../../hooks/useShoppingListItems"
import { Link } from "react-router-dom"
import { FaAngleRight } from "react-icons/fa6"

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
            <header className="bg-white/10 py-2 grid grid-cols-6 px-4">
                <h1 className="text-center text-lg font-bold col-span-4 col-start-2">Shoping List</h1>
                <MenuShoppingListPage />
            </header>
            <main className="p-4 flex flex-col gap-4">
                { shoppingList?.length > 0 && <ListShoppingListEl /> }
                { formOn && <AddItemEl popularitemsArr={popularItems} /> }
                <Link 
                    to="recipes"
                    className="py-2 px-4 border border-blue-600/50 text-blue-600 00 mb-3 rounded-md flex items-center justify-between gap-1"
                >
                    Recipes
                    <span className="p-1 border border-transparent">
                        <FaAngleRight />
                    </span>
                </Link>
            </main>
            {
                openConfirmDialog && <ConfirmDialog />
            }
        </>
    )
}