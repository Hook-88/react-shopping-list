import getStringFirstCharCap from "../../utility/getStringFirstCharCap"
import { FaMinus, FaPlus } from "react-icons/fa6"

export default function ListItemDefault({item}) {
    
    return (
        <div 
            className="py-2 px-4 border border-transparent mb-3 rounded-md bg-white/10 flex items-center"
        >
            {getStringFirstCharCap(item.name)}
            {
                item.quantity > 1 &&
                <>
                    &nbsp;
                    ({item.quantity}x)
                </>
            }
            <div className="flex gap-2 ml-auto">
                {
                    item.quantity > 1 &&    
                    <button className="p-1 border border-white/10 rounded-md bg-red-900">
                        <FaMinus />
                    </button>
                }
                <button className="p-1 border rounded-md border-white/10 bg-sky-900">
                    <FaPlus />
                </button>

            </div>
        </div>
    )
}