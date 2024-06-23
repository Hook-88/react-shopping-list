import IconMore from "../../components/Icons/IconMore"
import Menu from "../../components/Menu/Menu"
import { useStore } from "../../store/store"
import { useSetAtom } from "jotai"
import { menuOpenAtom } from "../../store/store"

export default function HeaderMenu() {
    const openAddIngredient = useStore(state => state.updateFormData)
    const setOpenMenu = useSetAtom(menuOpenAtom)

    function handleClickAdd() {
        openAddIngredient(true)
        setOpenMenu(false)
    }
    
    return (
        <Menu className="col-span-2">
            <Menu.Button>
                <IconMore className="justify-end mr-5"/>
            </Menu.Button>

            <Menu.Dropdown>
                <Menu.Item onClick={handleClickAdd}>Add</Menu.Item>
                <Menu.Item>Edit</Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}