import { Link } from "react-router-dom"
import { FaAngleRight } from "react-icons/fa6"

export default function NavLinkTo({children, to}) {
    
    return (
        <Link 
            to={to}
            className="py-2 px-4 border border-blue-600/50 text-blue-600 00 mb-3 rounded-md flex items-center justify-between gap-1"
        >
            {children}
            <span className="p-1 border border-transparent">
                <FaAngleRight />
            </span>
        </Link>
    )
}