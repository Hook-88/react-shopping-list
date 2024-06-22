import { Link } from "react-router-dom"
import Card from "./Card"
import { FaAngleRight } from "react-icons/fa6"

export default function LinkNav({children, to}) {
    
    return (
        <Link to={to}>
            <Card className="flex items-center justify-between text-blue-500 border-blue-500">
                <span className="ml-2">
                    {children}
                </span>
                <span className="mr-3">
                    <FaAngleRight />
                </span>
            </Card>
        </Link>
    )
}