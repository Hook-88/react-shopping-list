import { useSetAtom } from "jotai"
import { menuOpenAtom } from "./../../store/store"
import { twMerge } from "tailwind-merge"
import { useContext } from "react"
import { MenuContext } from "./Menu"

export default function MenuButton({children, className}) {
    const { toggleOpen } = useContext(MenuContext)
    const MenuButtonClassName = twMerge(
        "h-full w-full",
        className
    )
    
    return (
        <button
            className={MenuButtonClassName}
            onClick={toggleOpen}
        >
            {children}
        </button>
    )
}