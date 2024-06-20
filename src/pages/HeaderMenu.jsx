import Menu from "../components/Menu/Menu"
import IconMore from "../components/Icons/IconMore"
import { useSetAtom, useAtom } from "jotai"
import { editListOnAtom } from "./ShoppingListPage"
import { menuOpenAtom } from "../components/Menu/Menu"

export default function HeaderMenu() {
    const [editListOn, setEditListOn] = useAtom(editListOnAtom)
    const setOpen = useSetAtom(menuOpenAtom)

    function handleClickEditItem() {
        setEditListOn(prev => !prev)
        setOpen(false)
    }
    
    return (
        <Menu>
            <Menu.Button>
                <IconMore />
            </Menu.Button>

            <Menu.Dropdown>
                <Menu.Item>Add item</Menu.Item>
                <Menu.Item onClick={handleClickEditItem}>
                    {
                        editListOn ? 
                        "Cancel edit item" : 
                        "Edit item"
                    }
                </Menu.Item>
                <Menu.Item>Hide checked items</Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}