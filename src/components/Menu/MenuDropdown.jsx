import { useContext, useEffect, useRef } from "react"
import { MenuContext } from "./Menu"

export default function MenuDropdown({children}) {
    const { open, setOpen } = useContext(MenuContext)

    // const dropdownRef = useRef()

    // useEffect(() => {
    //     function handleEvent(event) {
    //         console.log("open")
    //         if (!dropdownRef.current?.contains(event.target)) {
    //             setOpen(false)
    //         }
    //     }

    //     document.addEventListener("mousedown", handleEvent)

    //     return () => document.removeEventListener("mousedown", handleEvent)
    // }, [open])
    
    return (
        open ?
        <ul 
            className="absolute top-10 -right-2 bg-black/20 backdrop backdrop-blur rounded-md border border-white/10 text-center text-lg"
            // ref={dropdownRef}
        >
            {children}
        </ul> : null
    )
}