import { useSetAtom } from "jotai"
import Menu, { menuOpenAtom } from "../components/Menu/Menu"
import { FaEllipsis } from "react-icons/fa6"
import { AddItemCardAtom } from "./AddItemCard"

export default function HeaderMenu() {
    const setMenuOpen = useSetAtom(menuOpenAtom)
    const setOpenAddItemCard = useSetAtom(AddItemCardAtom)

    function handleClickAddItem() {
        setOpenAddItemCard(true)
        setMenuOpen(false)
    }
    
    return (
        <Menu>
            <Menu.Button className="col-start-9 flex items-center justify-end pr-5">
                <FaEllipsis />
            </Menu.Button>

            <Menu.Dropdown>
                <Menu.Item onClick={handleClickAddItem}>Add Item</Menu.Item>
                <Menu.Item>Add List</Menu.Item>
                <Menu.Item>Edit Item</Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}