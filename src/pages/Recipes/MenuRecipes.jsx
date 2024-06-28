import Menu from "../../components/Menu/Menu"
import IconMore from "../../components/Icons/IconMore"
import { useContext } from "react"
import { FormContext } from "../../Context/FormContextComponent"
import { ShoppingListContext } from "./../ShoppingList/ShoppingListContextComponent"
import { DialogConfirmContext } from "../../components/DialogConfirm/DialogConfirm"

export default function MenuRecipes() {
    // const { openForm } = useContext(FormContext)
    // const { deleteSelectioninFirebase } = useContext(ShoppingListContext)
    // const { setDialogObj } = useContext(DialogConfirmContext)

    // function handleClickAdd() {
    //     openForm()
    // }

    // function handleClickDelete() {
    //     setDialogObj({
    //         question: "Do you want to delete?",
    //         confirmCallbackFn: () => deleteSelectioninFirebase()
    //     })
    // }
    
    return (
        <Menu className="col-span-2">
            <Menu.Button className="flex items-center justify-end pr-4">
                <IconMore className="px-1"/>
            </Menu.Button>
            <Menu.Dropdown>
                <Menu.Item>Add recipe</Menu.Item>
                {/* <Menu.Item onClick={handleClickDelete}>Delete Selection</Menu.Item> */}
            </Menu.Dropdown>
        </Menu>
    )
}