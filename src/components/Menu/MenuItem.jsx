import { twMerge } from "tailwind-merge"

export default function MenuItem({children, onClick, className}) {
    const MenuItemClassName = twMerge(
        "text-nowrap py-2 px-4 border-b border-white/30 last:border-none text-right",
        className
    )
    
    return (
        <li 
            className={MenuItemClassName}
            onClick={onClick}
        >
            {children}
        </li>
    )
}