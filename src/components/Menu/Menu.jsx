import { createContext, useState } from "react"
import MenuButton from "./MenuButton"
import MenuDropdown from "./MenuDropdown"
import MenuItem from "./MenuItem"
import { twMerge } from "tailwind-merge"

const MenuContext = createContext()

export default function Menu({children, className}) {
    const [open, setOpen] = useState(false)
    const MenuClassName = twMerge(
        "relative",
        className
    )

    function toggleOpen() {
        setOpen(prevOpen => !prevOpen)
    }

    return (
        <MenuContext.Provider value={{open, toggleOpen}}>
            <div className={MenuClassName}>
                {children}
            </div>
        </MenuContext.Provider>
    )
}

Menu.Button = MenuButton
Menu.Dropdown = MenuDropdown
Menu.Item = MenuItem

export { MenuContext }