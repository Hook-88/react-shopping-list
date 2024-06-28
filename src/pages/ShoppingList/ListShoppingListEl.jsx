import { useContext } from "react"
import List from "../../components/List/List"
import { ShoppingListContext } from "./ShoppingListContextComponent"
import ListItemCardDefault from "./ListItemCardDefault"
import ListItemCardSelected from "./ListItemCardSelected"
import ListShoppingListDefault from "./ListShoppingListDefault"
import ListShoppingListFilter from "./ListShoppingListFilter"
import { FilterContext } from "../../Context/FilterContextComponent"

export default function ListShoppingListEl() {
    const { shoppingList, toggleItemSelectedInFirebase, deleteSelectioninFirebase } = useContext(ShoppingListContext)
    const {filters, addFilter, clearFilters} = useContext(FilterContext)

    // Add logic to add filter on click button
    
    return (
        shoppingList.length > 0 ?
        <List listArr={shoppingList}>
            <List.Header>
                <List.Progress onClick={deleteSelectioninFirebase}/>
                <button>
                    <small>Hide checked</small>
                </button>
            </List.Header>
            <ListShoppingListDefault/>
        </List> : null
    )
}