import { twMerge } from "tailwind-merge"

export default function ListItem({children, className, ...rest}) {
    const ListItemClassName = twMerge(
        "border border-white/35 rounded-lg px-4 py-2 flex justify-between cursor-pointer",
        className
    )

    return (
        <li className={ListItemClassName} {...rest}>
            {children}
        </li>
    )
}