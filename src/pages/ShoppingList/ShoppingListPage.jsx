import { useAtomValue } from "jotai"
import { shoppingListAtom } from "../../store/store"
import getStringFirstCharCap from "../../utility/getStringFirstCharCap"
import { FaMinus, FaPlus } from "react-icons/fa6"
import ListShoppingListEl from "./ListShoppingListEl"
import AddItemEl from "./AddItemEl"
import Menu from "../../components/Menu/Menu"

export default function ShoppingListPage() {
    const shoppingList = useAtomValue(shoppingListAtom)
    
    return (
        <>
            <header className="bg-white/10 py-2">
                <h1 className="text-center text-lg font-bold">Shoping List</h1>
                <Menu>
                    <Menu.Button>Menu</Menu.Button>
                    <Menu.Dropdown>
                        <Menu.Item>Add</Menu.Item>
                        <Menu.Item>Delete</Menu.Item>
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