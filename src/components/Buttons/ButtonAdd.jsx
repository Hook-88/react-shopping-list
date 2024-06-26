import { FaPlus } from "react-icons/fa6"

export default function ButtonAdd({onClick}) {
    
    return (
        <button 
            className="border border-white/30 rounded-lg p-1 bg-sky-900"
            onClick={onClick}
        >
            <FaPlus />
        </button>
    )
}