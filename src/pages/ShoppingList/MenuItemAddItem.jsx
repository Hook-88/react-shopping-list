import Menu from "../../components/Menu/Menu"
import { useStore } from "../../store/store"
import { useSetAtom } from "jotai"
import { menuOpenAtom } from "../../store/store"

export default function MenuItemAddItem() {
    const setFormOpen = useStore(state => state.updateFormData)
    const setOpenMenu = useSetAtom(menuOpenAtom)

    function handleClickAddItem() {
        setFormOpen(true)
        setOpenMenu(false)
    }
    
    return (
        <Menu.Item onClick={handleClickAddItem}>Add item</Menu.Item>
    )
}