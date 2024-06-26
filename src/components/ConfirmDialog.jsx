import Card from "./Card"
import Button from "./Buttons/Button"
import { useAtom } from "jotai"
import { confirmDialogAtom } from "../store/store"

export default function ConfirmDialog() {
    const [dialogObj, setDialogObj] = useAtom(confirmDialogAtom)

    function closeDialog() {
        setDialogObj(null)
    }

    function handleClickYes() {
        dialogObj.onConfirmCallbackFn()
        setDialogObj(null)
    }

    return (
        <div 
            className="bg-white/10 backdrop-blur fixed inset-0 flex flex-col justify-center gap-4 px-4"
        >
            <Card className="text-white grid gap-4 px-2 pt-4 bg-black/50">
                <p className="text-center">{dialogObj.question}</p>
                <div className="flex gap-2">
                    <Button className="flex-grow bg-green-900" onClick={handleClickYes}>Yes</Button>
                    <Button className="bg-red-900" onClick={closeDialog}>No</Button>
                </div>
            </Card>
        </div>
    )
}