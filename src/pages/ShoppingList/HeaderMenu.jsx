import IconMore from "../../components/Icons/IconMore"
import Menu from "../../components/Menu/Menu"

export default function HeaderMenu() {
    
    return (
        <Menu>
            <Menu.Button>
                <IconMore className="justify-end mr-5"/>
            </Menu.Button>

            <Menu.Dropdown>
                <Menu.Item>Add item</Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}