import { FaPlus } from "react-icons/fa6"
import { twMerge } from "tailwind-merge"

export default function IconAdd({className, ...rest}) {
    const IconEyeClassName = twMerge(
        "flex justify-center items-center",
        className
    )
    
    return (
        <span
            className={IconEyeClassName} 
            {...rest}
        >
            <FaPlus />
        </span>
    )
}