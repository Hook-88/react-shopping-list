import { Link } from "react-router-dom"
import { FaAngleLeft } from "react-icons/fa6"

export default function NavLinkBack({to = "./.."}) {
    
    return (
        <Link 
            className="flex items-center gap-1 text-blue-600"
            to={to}
        >
            <FaAngleLeft /> Back
        </Link>
    )
}