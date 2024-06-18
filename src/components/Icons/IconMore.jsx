import { FaEllipsis } from "react-icons/fa6"
import { twMerge } from "tailwind-merge"

export default function IconMore({className, ...rest}) {
    const IconMoreClassName = twMerge(
        "flex justify-center items-center",
        className
    )
    
    return (
        <span
            className={IconMoreClassName} 
            {...rest}
        >
            <FaEllipsis />
        </span>
    )
}