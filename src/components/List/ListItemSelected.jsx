import { twMerge } from "tailwind-merge"
import { FaCheck } from "react-icons/fa6"

export default function ListItemSelected({children, className, ...rest}) {
    const ListItemClassName = twMerge(
        "border border-white/35 rounded-lg px-4 py-2 flex justify-between cursor-pointer bg-green-900",
        className
    )

    return (
        <li className={ListItemClassName} {...rest}>
            {children}
            <div className="border border-white/0 p-1">
                <FaCheck />
            </div>
        </li>
    )
}