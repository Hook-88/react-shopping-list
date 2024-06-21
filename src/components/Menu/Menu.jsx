import { useSetAtom } from "jotai"
import MenuButton from "./MenuButton"
import MenuDropdown from "./MenuDropdown"
import MenuItem from "./MenuItem"
import { useEffect, useRef } from "react"
import { menuOpenAtom } from "../../store/store"

export default function Menu({children}) {
    const menuRef = useRef()
    const setOpen = useSetAtom(menuOpenAtom)

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
        <div className="relative" ref={menuRef}>
            {children}
        </div>
    )
}

Menu.Button = MenuButton
Menu.Dropdown = MenuDropdown
Menu.Item = MenuItem