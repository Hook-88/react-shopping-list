import { FaEye } from "react-icons/fa6"
import { twMerge } from "tailwind-merge"

export default function IconShow({className, ...rest}) {
    const IconEyeClassName = twMerge(
        "flex justify-center items-center",
        className
    )
    
    return (
        <span
            className={IconEyeClassName} 
            {...rest}
        >
            <FaEye />
        </span>
    )
}