import Menu from "../../components/Menu/Menu"
import IconMore from "../../components/Icons/IconMore"
import { useContext } from "react"
import { FormContext } from "../../Context/FormContextComponent"

export default function ShoppingListMenu() {
    const { openForm } = useContext(FormContext)

    function handleClickAdd() {
        openForm()
    }
    
    return (
        <Menu className="col-span-2">
            <Menu.Button className="flex items-center justify-end pr-4">
                <IconMore className="px-1"/>
            </Menu.Button>
            <Menu.Dropdown>
                <Menu.Item onClick={handleClickAdd}>Add Item</Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}