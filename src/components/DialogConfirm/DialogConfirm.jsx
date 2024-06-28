import { createContext, useState } from "react"

const DialogConfirmContext = createContext()

export default function DialogConfirm({children}) {
    const [dialogObj, setDialogObj] = useState(null)

    function closeDialog() {
        setDialogObj(null)
    }
    
    return (
        <DialogConfirmContext.Provider value={{dialogObj, setDialogObj, closeDialog}}>
            {children}
        </DialogConfirmContext.Provider>
    )
}

export { DialogConfirmContext }