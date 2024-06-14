import { useAtomValue } from "jotai"
import { menuOpenAtom } from "./Menu"


export default function MenuDropdown({children}) {
    const open = useAtomValue(menuOpenAtom)
    
    return open ? 
        <ul className="absolute top-9 right-0 bg-black/50 backdrop backdrop-blur border border-white/30 rounded-lg">
            {children}
        </ul> : null
}