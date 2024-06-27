import Menu from "../../components/Menu/Menu"
import IconMore from "../../components/Icons/IconMore"

export default function ShoppingListMenu() {
    
    return (
        <Menu className="col-span-2">
            <Menu.Button className="flex items-center justify-end pr-4">
                <IconMore className="px-1"/>
            </Menu.Button>
            <Menu.Dropdown>
                <Menu.Item>Add Item</Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}