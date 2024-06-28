import { useContext } from "react"
import DialogConfirmCard from "./DialogConfirmCard"
import { DialogConfirmContext } from "./DialogConfirm"

export default function DialogConfirmEl() {
    const { closeDialog } = useContext(DialogConfirmContext)

    return (
        <div 
            className="bg-white/10 backdrop-blur fixed inset-0 flex flex-col justify-center gap-4 px-4"
            onClick={closeDialog}
        >
            <DialogConfirmCard />
        </div>
    )
}