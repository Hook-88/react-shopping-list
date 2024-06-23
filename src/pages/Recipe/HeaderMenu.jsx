import IconMore from "../../components/Icons/IconMore"
import Menu from "../../components/Menu/Menu"

export default function HeaderMenu() {
    
    return (
        <Menu className="col-span-2">
            <Menu.Button>
                <IconMore className="justify-end mr-5"/>
            </Menu.Button>

            <Menu.Dropdown>
                <Menu.Item>Add</Menu.Item>
                <Menu.Item>Edit</Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}