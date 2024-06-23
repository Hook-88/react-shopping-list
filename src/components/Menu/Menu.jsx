import { useSetAtom } from "jotai"
import MenuButton from "./MenuButton"
import MenuDropdown from "./MenuDropdown"
import MenuItem from "./MenuItem"
import { useEffect, useRef } from "react"
import { menuOpenAtom } from "../../store/store"
import { twMerge } from "tailwind-merge"

export default function Menu({children, className}) {
    const menuRef = useRef()
    const setOpen = useSetAtom(menuOpenAtom)
    const MenuClassName = twMerge(
        "relative",
        className
    )

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
        <div className={MenuClassName} ref={menuRef}>
            {children}
        </div>
    )
}

Menu.Button = MenuButton
Menu.Dropdown = MenuDropdown
Menu.Item = MenuItem