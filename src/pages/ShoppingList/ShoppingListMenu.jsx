import Menu from "./../../components/Menu/Menu"
import IconMore from "../../components/Icons/IconMore"
import { useSetAtom } from "jotai"
import { menuOpenAtom } from "../../store/store"
import MenuItemAddButton from "./MenuItemAddButton"
import MenuItemDeleteSelectionButton from "./MenuItemDeleteSelectionButton"

export default function ShoppingListMenu() {
    const setOpen = useSetAtom(menuOpenAtom)

    function toggleOpen() {
        setOpen(prev => !prev)
    }
  
    return (
        <Menu className="col-span-2">
            <Menu.Button className="flex justify-end items-center pr-5"><IconMore /></Menu.Button>
            <Menu.Dropdown onClick={toggleOpen}>
                <MenuItemAddButton />
                <MenuItemDeleteSelectionButton />
            </Menu.Dropdown>
        </Menu>
    )
}