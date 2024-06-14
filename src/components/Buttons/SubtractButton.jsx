import { FaMinus } from "react-icons/fa6"

export default function SubtractButton({onClick}) {
    
    return (
        <button 
            className="border border-white/30 rounded-lg p-1 bg-red-900"
            onClick={onClick}
        >
            <FaMinus />
        </button>
    )
}