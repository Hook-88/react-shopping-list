import { doc, getDoc, updateDoc } from "firebase/firestore"
import getStringFirstCharCap from "../../utility/getStringFirstCharCap"
import { FaMinus, FaPlus } from "react-icons/fa6"
import { db } from "../../firebase"

export default function ListItemDefault({item}) {

    async function modifyFirbaseItemQuantity(num) {
        const docRef = doc(db, "shoppingList", item.id)
        const docSnap = await getDoc(docRef)

        await updateDoc(docRef, {quantity: docSnap.data().quantity + num})
    }

    function handleClickDecrement(event) {
        event.stopPropagation()
        modifyFirbaseItemQuantity(-1)
    }

    function handleClickIncrement(event) {
        event.stopPropagation()
        modifyFirbaseItemQuantity(1)
    }
    
    return (
        <div 
            className="py-2 px-4 border border-transparent mb-3 rounded-md bg-white/10 flex items-center gap-1"
        >
            <p>{getStringFirstCharCap(item.name)}</p>
            
            { item.quantity > 1 && `(${item.quantity}x)` }

            <div className="flex gap-2 ml-auto">
                {
                    item.quantity > 1 &&    
                    <button 
                        className="p-1 border border-white/10 rounded-md bg-red-900"
                        onClick={handleClickDecrement}
                    >
                        <FaMinus />
                    </button>
                }
                <button 
                    className="p-1 border rounded-md border-white/10 bg-sky-900"
                    onClick={handleClickIncrement}
                >
                    <FaPlus />
                </button>

            </div>
        </div>
    )
}