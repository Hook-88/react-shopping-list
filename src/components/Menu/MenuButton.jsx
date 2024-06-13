import { useSetAtom } from 'jotai'
import { openAtom } from "./Menu"

export default function MenuButton({children}) {
    const setOpen = useSetAtom(openAtom)

    function toggle() {
        setOpen(prevOpen => !prevOpen)
    }
    
    return (
        <div onClick={toggle}>
            {children}
        </div>
    )
}