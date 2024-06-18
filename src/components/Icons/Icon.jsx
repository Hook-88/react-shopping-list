import { FaCheck } from "react-icons/fa6"
import { twMerge } from "tailwind-merge"

export default function Icon({className, children, ...rest}) {
    const IconCheckClassName = twMerge(
        "flex items-center justify-center"
    )
    
    return (
        <span
            className={IconCheckClassName} 
            {...rest}
        >
            {children}
        </span>
    )
}

Icon.Check = () => {

    return (
        <Icon>
            <FaCheck />
        </Icon>
    )
}