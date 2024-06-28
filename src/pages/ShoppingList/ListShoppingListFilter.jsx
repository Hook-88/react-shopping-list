import { useContext } from "react"
import List from "../../components/List/List"
import { ShoppingListContext } from "./ShoppingListContextComponent"
import ListItemCardDefault from "./ListItemCardDefault"
import ListItemCardSelected from "./ListItemCardSelected"

export default function ListShoppingListFilter({filter}) {
    const { toggleItemSelectedInFirebase } = useContext(ShoppingListContext)

    return (
        <List.List>
            {
                arr => arr.filter(item => item[filter] === false).map(item => (
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
        </List.List>
    )
}