import PageHeader from "../../components/PageHeader/PageHeader"
import ShoppingListEl from "./ShoppingListEl"
import Menu from "./../../components/Menu/Menu"
import IconMore from "../../components/Icons/IconMore"
import { useSetAtom } from "jotai"
import { menuOpenAtom } from "../../store/store"

export default function ShoppingListMenu() {
    const setOpen = useSetAtom(menuOpenAtom)

    function toggleOpen() {
        setOpen(prev => !prev)
    }
    
    return (
        <Menu className="col-span-2">
            <Menu.Button className="flex justify-end items-center pr-5"><IconMore /></Menu.Button>
            <Menu.Dropdown onClick={toggleOpen}>
                <Menu.Item>Add item</Menu.Item>
                <Menu.Item>Delete selected</Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}