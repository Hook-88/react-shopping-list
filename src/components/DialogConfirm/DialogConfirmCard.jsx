import Card from "../Card"
import Button from "../Buttons/Button"
import { useContext } from "react"
import { DialogConfirmContext } from "./DialogConfirm"

export default function DialogConfirmCard() {
    const { closeDialog, dialogObj } = useContext(DialogConfirmContext)

    function handleClickCard(event) {
        event.stopPropagation()
    }

    function handleConfirm() {
        if (dialogObj?.confirmCallbackFn) {
            dialogObj.confirmCallbackFn()
            closeDialog()
            
            return
        }

        console.log("no confirmCallbackFn given in dialogObj")
        
        return
    }

    return (
        <Card 
            className="text-white grid gap-4 px-2 pt-4 bg-black/50"
            onClick={handleClickCard}
        >
            <p className="text-center">{dialogObj?.question ? dialogObj.question : "Are you sue?"}</p>
            <div className="flex gap-2">
                <Button className="flex-grow bg-green-900" onClick={handleConfirm}>Yes</Button>
                <Button className="bg-red-900" onClick={closeDialog}>No</Button>
            </div>
        </Card>
    )
}