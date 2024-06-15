import { useSetAtom } from "jotai"
import { menuOpenAtom } from "./Menu"
import { twMerge } from "tailwind-merge"

export default function MenuButton({children, className}) {
    const setOpen = useSetAtom(menuOpenAtom)
    const MenuButtonClassName = twMerge(
        "h-full w-full",
        className
    )

    function handleClick() {
        setOpen(prev => !prev)
    }
    
    return (
        <button
            className={MenuButtonClassName}
            onClick={handleClick}
        >
            {children}
        </button>
    )
}