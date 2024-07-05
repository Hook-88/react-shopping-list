import { useAtomValue } from "jotai"
import { shoppingListAtom } from "../../store/store"
import getStringFirstCharCap from "../../utility/getStringFirstCharCap"
import { FaEllipsis, FaMinus, FaPlus } from "react-icons/fa6"
import ListShoppingListEl from "./ListShoppingListEl"
import AddItemEl from "./AddItemEl"
import Menu from "../../components/Menu/Menu"

export default function ShoppingListPage() {
    const shoppingList = useAtomValue(shoppingListAtom)

    return (
        <>
            <header className="bg-white/10 py-2 grid grid-cols-6 px-4">
                <h1 className="text-center text-lg font-bold col-span-4 col-start-2">Shoping List</h1>
                <Menu className="flex items-center">
                    <Menu.Button className="w-full h-full flex items-center justify-end">
                        <span className="p-1 border border-transparent">
                            <FaEllipsis />
                        </span>
                    </Menu.Button>
                    <Menu.Dropdown>
                        <Menu.Item className="px-2 py-1 border-b border-white/10">Add</Menu.Item>
                        <Menu.Item className="px-2 py-1">Delete</Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </header>
            <main className="p-4">
                {
                    shoppingList &&
                    <ListShoppingListEl />
                }
                <AddItemEl />
            </main>
        </>
    )
}