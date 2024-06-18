import { useAtomValue } from "jotai"
import { menuOpenAtom } from "./Menu"

export default function MenuDropdown({children}) {
    const open = useAtomValue(menuOpenAtom)

    return (
        open ?
        <ul className="border border-white/30 cursor-pointer absolute right-0 rounded-lg bg-black/50 backdrop-blur">
            {children}
        </ul> : null
    )
}