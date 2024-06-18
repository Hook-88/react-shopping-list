import { FaCheck } from "react-icons/fa6"

export default function IconCheck({className, ...rest}) {
    const IconCheckClassName = twMerge(
        "flex items-center justify-center"
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