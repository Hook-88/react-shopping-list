import { Link } from "react-router-dom"
import Card from "../Card"
import { FaAngleRight } from "react-icons/fa6"

export default function LinkNav({children, to, onClick}) {
    
    return (
        <Link to={to} onClick={onClick}>
            <Card className="flex p-2 items-center justify-between text-blue-500 border-blue-500">
                <span className="ml-2">
                    {children}
                </span>
                <span className="mr-2.5 p-1">
                    <FaAngleRight />
                </span>
            </Card>
        </Link>
    )
}