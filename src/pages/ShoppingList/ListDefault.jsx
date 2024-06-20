import List from "../../components/List/List"
import ShoppingListListItem from "./ShoppingListListItem"

export default function ListDefault({listObj, itemsArr}) {
    
    return (
        <List>
            {
                itemsArr.map(item => {

                    return (
                        <ShoppingListListItem
                            key={item.id} 
                            itemObj={{...item, listId: listObj.id}} 
                        />
                    )
                })
            }
        </List>
    )
}