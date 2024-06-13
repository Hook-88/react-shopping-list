import { useRef } from "react"

export default function MenuItem({children}) {
    
    return (
        <li className="text-nowrap py-2 px-4 border-b border-white/30 last:border-none">{children}</li>
    )
}