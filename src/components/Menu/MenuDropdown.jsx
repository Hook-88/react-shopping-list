import { useContext } from "react"
import { MenuContext } from "./Menu"

export default function MenuDropdown({children}) {
    const {open} = useContext(MenuContext)
    
    return (
        open ?
        <ul className="absolute top-10">
            {children}
        </ul> : null
    )
}