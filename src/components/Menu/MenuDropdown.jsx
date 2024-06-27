import { useAtomValue } from "jotai"
import { menuOpenAtom } from "./../../store/store"
import { useContext } from "react"
import { MenuContext } from "./Menu"

export default function MenuDropdown({children, onClick}) {
    const { open } = useContext(MenuContext)

    return (
        open ?
        <ul 
            className="border border-white/30 cursor-pointer absolute right-0 rounded-lg bg-black/50 backdrop-filter backdrop-blur"
            onClick={onClick}
        >
            {children}
        </ul> : null
    )
}