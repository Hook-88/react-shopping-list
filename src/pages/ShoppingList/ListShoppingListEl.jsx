import { useContext } from "react"
import List from "../../components/List/List"
import { ShoppingListContext } from "./ShoppingListContextComponent"
import ListItemCardDefault from "./ListItemCardDefault"
import ListItemCardSelected from "./ListItemCardSelected"

export default function ListShoppingListEl() {
    const { shoppingList, toggleItemSelectedInFirebase, deleteSelectioninFirebase } = useContext(ShoppingListContext)
    
    return (
        shoppingList.length > 0 ?
        <List listArr={shoppingList}>
            <List.Header>
                <List.Progress onClick={deleteSelectioninFirebase}/>
            </List.Header>
            <List.ListDefault>
                {
                    arr => arr.map(item => (
                        <li 
                            key={item.id}
                            onClick={() => toggleItemSelectedInFirebase(item.id)}
                        >
                            {
                                item.selected ?
                                <ListItemCardSelected item={item}/> :
                                <ListItemCardDefault item={item}/>
                            }
                        </li>
                    ))
                }
            </List.ListDefault>
        </List> : null
    )
}