import Header from "../components/Header"
import { FaEllipsis } from "react-icons/fa6"
import Menu from "../components/Menu/Menu"

export default function ShoppingListPageHeader() {
    
    return (
        <Header>
            <h1 className="col-span-4 col-start-2 text-center self-center font-bold">SHOPPING</h1>
                <Menu className="flex items-center justify-end">
                    <Menu.Button className="py-3 justify-end pr-5">
                        <FaEllipsis />
                    </Menu.Button>
                    <Menu.Dropdown>
                        <Menu.Item>Add Item</Menu.Item>
                        <Menu.Item>Edit Item</Menu.Item>
                        <Menu.Item>Add List</Menu.Item>
                    </Menu.Dropdown>
                </Menu>
        </Header>
    )
}