import IconMore from "../../components/Icons/IconMore"
import Menu from "../../components/Menu/Menu"
import MenuItemAddItem from "./MenuItemAddItem"
import MenuItemDeleteItems from "./MenuItemDeleteItems"

export default function HeaderMenu() {
    
    return (
        <Menu>
            <Menu.Button>
                <IconMore className="justify-end mr-5"/>
            </Menu.Button>

            <Menu.Dropdown>
                <MenuItemAddItem />
                <MenuItemDeleteItems />
            </Menu.Dropdown>
        </Menu>
    )
}