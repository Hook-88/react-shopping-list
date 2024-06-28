import { useContext } from "react"
import List from "../../components/List/List"
import { ShoppingListContext } from "./ShoppingListContextComponent"
import ListItemCardDefault from "./ListItemCardDefault"
import ListItemCardSelected from "./ListItemCardSelected"
import ListShoppingListDefault from "./ListShoppingListDefault"
import ListShoppingListFilter from "./ListShoppingListFilter"
import { FilterContext } from "../../Context/FilterContextComponent"
import { FaEye, FaEyeSlash } from "react-icons/fa6"

export default function ListShoppingListEl() {
    const { shoppingList, deleteSelectioninFirebase } = useContext(ShoppingListContext)
    const {filters, setFilters, clearFilters} = useContext(FilterContext)

    function toggleFilterSelected() {
        filters ? clearFilters() : setFilters('selected')
    }
    
    return (
        shoppingList.length > 0 ?
        <List listArr={shoppingList}>
            <List.Header className="flex items-center justify-between">
                <List.Progress onClick={deleteSelectioninFirebase}/>
                <button 
                    className="flex items-center pr-1.5 disabled:text-white/50"
                    onClick={toggleFilterSelected}
                    disabled={!shoppingList.some(item => item.selected === true)}
                >
                    {
                        filters ?
                        <>
                            <small className="flex items-center">
                                Show checked
                                &nbsp;
                                <FaEye />
                            </small>
                        </>  : 
                        <>
                            <small className="flex items-center">
                                Hide checked
                                &nbsp;
                                <FaEyeSlash />
                            </small>
                        </>
                    }
                </button>
            </List.Header>
            {
                filters ?
                <ListShoppingListFilter filter={filters}/> :
                <ListShoppingListDefault/>
            }
        </List> : null
    )
}