import { twMerge } from "tailwind-merge"

export default function Header({children, className}) {
    const HeaderClassName = twMerge(
        "grid grid-cols-6 text-lg px-4",
        className
    )
    
    return (
        <header className={HeaderClassName}>
            {children}
        </header>
    )
}