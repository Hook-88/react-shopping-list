import { useContext } from "react"
import List from "../../components/List/List"
import { ShoppingListContext } from "./ShoppingListContextComponent"
import ListItemCardDefault from "./ListItemCardDefault"
import ListItemCardSelected from "./ListItemCardSelected"

export default function ListShoppingListEl() {
    const { shoppingList } = useContext(ShoppingListContext)
    
    return (
        <List listArr={shoppingList}>
            <List.Header>
                <List.Progress />
            </List.Header>
            <List.ListDefault>
                {
                    arr => arr.map(item => (
                        <li key={item.id}>
                            <ListItemCardSelected item={item}/>
                        </li>
                    ))
                }
            </List.ListDefault>

        </List>
    )
}