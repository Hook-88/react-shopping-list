import { useContext } from "react"
import { MenuContext } from "./Menu"

export default function MenuItem({children, className, onClick = () => {}}) {
    const {toggleOpen} = useContext(MenuContext)

    function handleClick() {
        onClick()
        toggleOpen()
    }
    
    return (
        <li onClick={handleClick} className={className}>
            {children}
        </li>
    )
}