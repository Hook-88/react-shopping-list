import { useContext } from "react"
import { MenuContext } from "./Menu"

export default function MenuDropdown({children}) {
    const { open, toggleOpen } = useContext(MenuContext)

    return (
        open ?
        <ul 
            className="border border-white/30 cursor-pointer absolute right-0 rounded-lg bg-black/50 backdrop-filter backdrop-blur"
            onClick={toggleOpen}
        >
            {children}
        </ul> : null
    )
}