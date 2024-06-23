import { Link } from "react-router-dom"
import { FaAngleLeft } from "react-icons/fa6"
import { twMerge } from "tailwind-merge"

export default function LinkNavBack({className, onClick}) {
    const LinkNavBackClassName = twMerge(
        "flex gap-1 items-center font-light text-blue-500",
        className
    )
    
    return (
        <Link 
            className={LinkNavBackClassName} 
            to="./.."
            onClick={onClick}
        >
            <FaAngleLeft />Back
        </Link>
    )
}