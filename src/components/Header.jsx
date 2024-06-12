import { twMerge } from "tailwind-merge"

export default function Header({children, className}) {
    const HeaderClassName = twMerge(
        "grid grid-cols-6 text-lg px-4 fixed inset-x-0 top-0 bg-black/30 backdrop-blur-md",
        className
    )
    
    return (
        <header className={HeaderClassName}>
            {children}
        </header>
    )
}