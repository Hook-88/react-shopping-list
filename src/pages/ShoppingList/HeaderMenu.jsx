import Menu, { menuOpenAtom } from "../../components/Menu/Menu"
import IconMore from "../../components/Icons/IconMore"
import { useSetAtom } from "jotai"
import { addNewItemAtom } from "../../store/store"

export default function HeaderMenu() {
    const setAddNewItemOn = useSetAtom(addNewItemAtom)
    const setMenuOpen = useSetAtom(menuOpenAtom)

    function handleClickAddItem() {
        setAddNewItemOn(true)
        setMenuOpen(false)

    }
    
    return (
        <Menu>
            <Menu.Button className="flex items-center justify-end pr-5">
                <IconMore />
            </Menu.Button>
            <Menu.Dropdown>
                <Menu.Item onClick={handleClickAddItem}>
                    Add new item
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}