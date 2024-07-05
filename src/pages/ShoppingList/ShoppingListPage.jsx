import { useAtomValue } from "jotai"
import { shoppingListAtom } from "../../store/store"
import getStringFirstCharCap from "../../utility/getStringFirstCharCap"
import { FaMinus, FaPlus } from "react-icons/fa6"
import ListShoppingListEl from "./ListShoppingListEl"

export default function ShoppingListPage() {
    const shoppingList = useAtomValue(shoppingListAtom)
    
    return (
        <>
            <header className="bg-white/10 py-2">
                <h1 className="text-center text-lg font-bold">Shoping List</h1>
            </header>
            <main className="p-4">
                {
                    shoppingList &&
                    <ListShoppingListEl />
                }
            </main>
        </>
    )
}