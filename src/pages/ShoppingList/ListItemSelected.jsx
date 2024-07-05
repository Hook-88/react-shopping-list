import getStringFirstCharCap from "../../utility/getStringFirstCharCap"
import { FaCheck } from "react-icons/fa6"

export default function ListItemSelected({item}) {
    
    return (
        <div 
            className="py-2 px-4 border border-white/10 mb-3 rounded-md bg-green-900 flex items-center"
        >
            {getStringFirstCharCap(item.name)}
            {
                item.quantity > 1 &&
                <>
                    &nbsp;
                    ({item.quantity}x)
                </>
            }
            <span className="p-1 border border-transparent flex items-center ml-auto">
                <FaCheck />
            </span>
        </div>
    )
}