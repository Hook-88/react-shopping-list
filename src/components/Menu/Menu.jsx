import { atom, useSetAtom } from "jotai"
import MenuButton from "./MenuButton"
import MenuDropdown from "./MenuDropdown"
import MenuItem from "./MenuItem"
import { twMerge } from "tailwind-merge"
import { useEffect, useRef } from "react"

export const menuOpenAtom = atom(false)

export default function Menu({children, className}) {
    const setOpen = useSetAtom(menuOpenAtom)
    
    const MenuClassName = twMerge(
        "relative",
        className
    )

    const menuRef = useRef()

    useEffect(() => {
        function handler(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", handler)

        return () => document.removeEventListener("mousedown", handler)
    })


    return (
        <div className={MenuClassName} ref={menuRef}>
            {children}
        </div>
)
}

Menu.Button = MenuButton
Menu.Dropdown = MenuDropdown
Menu.Item = MenuItem