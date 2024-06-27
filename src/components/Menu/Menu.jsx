import { useSetAtom } from "jotai"
import MenuButton from "./MenuButton"
import MenuDropdown from "./MenuDropdown"
import MenuItem from "./MenuItem"
import { createContext, useEffect, useRef, useState } from "react"
import { menuOpenAtom } from "../../store/store"
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
        function handler(event) {
            if (!menuRef?.current.contains(event.target)) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", handler)

        return () => {
            document.removeEventListener("mousedown", handler)
        }
    }, [])
    
    return (
        <MenuContext.Provider value={{open, toggleOpen}}>
            <div className={MenuClassName} ref={menuRef}>
                {children}
            </div>
        </MenuContext.Provider>
    )
}

Menu.Button = MenuButton
Menu.Dropdown = MenuDropdown
Menu.Item = MenuItem

export {MenuContext}