import { twMerge } from "tailwind-merge"

export default function ListItem({children, className, ...rest}) { 
    const ListItemClassName = twMerge(
        "py-2 px-4 border border-white/30 rounded-lg cursor-pointer flex",
        // itemObj.selected ? "bg-green-900" : "",
        className
    )
    
    return (
        // <li 
        //     className={ListItemClassName}
        //     {...rest}
        // >
        //     {children}
        // </li>
        <li 
            className={ListItemClassName}
            {...rest}
        >
            {children}
        </li>
    )
}