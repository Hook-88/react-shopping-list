import { useAtom } from "jotai"
import { confirmDialogAtom } from "../../store/store"

export default function ConfirmDialog() {
    const [confirmObj, setConfirmObj] = useAtom(confirmDialogAtom)

    function closeDialog() {
        setConfirmObj(null)
    }

    function handleClickCard(event) {
        event.stopPropagation()
    }

    function handleClickYes() {
        confirmObj.onConfirm()

        setTimeout(() => {
            closeDialog()
        }, 100)
    }


    return (  
            <div 
                className="bg-black/20 backdrop backdrop-blur-sm fixed inset-0 flex items-center justify-center"
                onClick={closeDialog}
            >
                <div className="p-4 bg-[#1a1a1a] rounded-md border border-white/10" onClick={handleClickCard}>
                    <p className="text-center">{confirmObj.question}</p>
                    <div className="flex gap-2 mt-4">
                        <button 
                            className="bg-green-900 px-6 py-1 rounded-md border border-white/10 flex-grow"
                            onClick={handleClickYes}
                        >
                            Yes
                        </button>
                        <button 
                            className="bg-red-900 px-2 py-1 rounded-md border border-white/10"
                            onClick={closeDialog}
                        >
                            No
                        </button>
                    </div>
                </div>
            </div>
    )
}