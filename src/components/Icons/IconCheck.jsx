import { FaCheck } from "react-icons/fa6"
import { twMerge } from "tailwind-merge"

export default function IconCheck({className, ...rest}) {
    const IconCheckClassName = twMerge(
        "flex items-center justify-center",
        className
    )
    
    return (
        <span
            className={IconCheckClassName} 
            {...rest}
        >
            <FaCheck />
        </span>
    )
}