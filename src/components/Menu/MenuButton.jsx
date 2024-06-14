import { twMerge } from 'tailwind-merge'
import { useSetAtom } from 'jotai'
import { menuOpenAtom } from "./Menu"


export default function MenuButton({children, className}) {
    const setOpen = useSetAtom(menuOpenAtom)
    const MenuButtonClassName = twMerge(
        "w-full h-full flex items-center justify-center",
        className
    )

    function toggle() {
        setOpen(prevOpen => !prevOpen)
    }
    
    return (
        <button onClick={toggle} className={MenuButtonClassName}>
            {children}
        </button>
    )
}