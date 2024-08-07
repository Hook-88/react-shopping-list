import { useContext } from "react"
import { MenuContext } from "./Menu"


export default function MenuButton({children, className}) {
    const { toggleOpen } = useContext(MenuContext)

    // Fix menu

    return (
        <button className={className} onClick={toggleOpen}>
            {children}
        </button>
    )
}