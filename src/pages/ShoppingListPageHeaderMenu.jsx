import Menu from "./../components/Menu/Menu"
import { FaEllipsis } from "react-icons/fa6"
import { addItemAtom } from "./AddItemForm"
import { menuOpenAtom } from "./../components/Menu/Menu"
import { useSetAtom } from "jotai"

export default function ShoppingListPageHeaderMenu() {
    const setAddItemOpen = useSetAtom(addItemAtom)
    const setOpen = useSetAtom(menuOpenAtom)

    function handleClickAddItem() {
        setAddItemOpen(true)
        setOpen(false)
    }


    
    return (
        <Menu className="flex items-center justify-end">
            <Menu.Button className="py-3 justify-end pr-5">
                <FaEllipsis />
            </Menu.Button>
            <Menu.Dropdown>
                <Menu.Item onClick={handleClickAddItem}>Add Item</Menu.Item>
                <Menu.Item>Edit Item</Menu.Item>
                <Menu.Item>Add List</Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}