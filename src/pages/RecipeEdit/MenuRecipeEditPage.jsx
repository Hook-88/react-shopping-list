import Menu from "../../components/Menu/Menu"
import { FaEllipsis } from "react-icons/fa6"
import { useAtom } from "jotai"
import { pageFormsOpenAtom } from "../../store/store"

export default function MenuRecipeEditPage() {
    const [openForm, setOpenForm] = useAtom(pageFormsOpenAtom)

    function handleClickAdd() {
        setOpenForm(true)
    }
    
    return (
        <Menu className="flex items-center">
            <Menu.Button className="w-full h-full flex items-center justify-end">
                <span className="p-1 border border-transparent">
                    <FaEllipsis />
                </span>
            </Menu.Button>
            
            <Menu.Dropdown>
                <Menu.Item 
                    className="px-4 py-1 border-b border-white/10 text-nowrap"
                    onClick={handleClickAdd}
                >
                    Add ingredient
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}