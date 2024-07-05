import { useContext } from "react"
import { MenuContext } from "./Menu"

export default function MenuItem({children}) {
    const {toggleOpen} = useContext(MenuContext)
    
    return (
        <li onClick={toggleOpen}>
            {children}
        </li>
    )
}