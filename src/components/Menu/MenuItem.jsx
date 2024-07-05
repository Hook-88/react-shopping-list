import { useContext } from "react"
import { MenuContext } from "./Menu"

export default function MenuItem({children, className}) {
    const {toggleOpen} = useContext(MenuContext)
    
    return (
        <li onClick={toggleOpen} className={className}>
            {children}
        </li>
    )
}