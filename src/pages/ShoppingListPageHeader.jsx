import Header from "../components/Header"
import { FaEllipsis } from "react-icons/fa6"
import Menu from "../components/Menu/Menu"
import HeaderMenu from "./ShoppingListPageHeaderMenu"

export default function ShoppingListPageHeader() {
    
    return (
        <Header>
            <h1 className="col-span-4 col-start-2 text-center self-center font-bold">SHOPPING</h1>
                <HeaderMenu />
        </Header>
    )
}

// TODO add event handlers to menu items  