import { IoClose } from "react-icons/io5"
import { FaCheck } from "react-icons/fa6"
import Card from "./Card"
import { useStore } from "../store/store"

export default function ConfirmActionModal({confirmModalObj}) {
    const closeModal = useStore(state => state.closeModal)

    function handleDeclineButton(event) {
        event.stopPropagation()
        closeModal()
    }
    
    return (
        confirmModalObj ?
        <div 
            className="fixed inset-0 bg-white/30 backdrop-blur flex items-center justify-center"
            onClick={closeModal}
        >
            <Card className="mx-4 bg-black/70">
                <h2 className="col-span-6">{confirmModalObj.confirmQuestion}</h2>
                <button 
                    className="bg-red-900 rounded-lg col-span-3 flex items-center justify-between p-2 px-4 border border-white/35"
                    onClick={handleDeclineButton}
                >
                    No
                    <IoClose />
                </button>
                <button 
                    className="p-2 px-4 col-start-4 bg-green-900 rounded-lg col-span-3 flex items-center justify-between border border-white/35"
                    onClick={confirmModalObj.onConfirm}
                >
                    Yes &nbsp;
                    <FaCheck />
                </button>
            </Card>

        </div> : null
    )
}