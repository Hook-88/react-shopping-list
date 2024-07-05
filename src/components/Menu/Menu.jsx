import { createContext, useEffect, useRef, useState } from "react"
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
    const menuRef = useRef()

    function toggleOpen() {
        setOpen(prevOpen => !prevOpen)
    }


    useEffect(() => {

        function handleEvent(event) {
            if (!menuRef.current?.contains(event.target)) {
                setOpen(false)
            }
        }

        if (open) {
            document.addEventListener("mousedown", handleEvent)
        }

        return () => document.removeEventListener("mousedown", handleEvent)

    }, [open])


    return (
        <MenuContext.Provider value={{open, toggleOpen, setOpen}}>
            <div className={MenuClassName} ref={menuRef}>
                {children}
            </div>
        </MenuContext.Provider>
    )
}

Menu.Button = MenuButton
Menu.Dropdown = MenuDropdown
Menu.Item = MenuItem

export { MenuContext }