import { atom } from "jotai"
import MenuButton from "./MenuButton"
import MenuDropdown from "./MenuDropdown"
import MenuItem from "./MenuItem"

export const openAtom = atom(false)

export default function Menu({children}) {

    return (
        <div className="relative">
            {children}
        </div>
    )
}

Menu.Button = MenuButton
Menu.Dropdown = MenuDropdown
Menu.Item = MenuItem