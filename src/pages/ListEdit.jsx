import { useState } from "react"
import List from "../components/List/List"
import ShoppingListListItemEdit from "./ShoppingListListItemEdit"

export default function ListEdit({listObj, itemsArr}) {
    const newItemsArr = itemsArr.map(item => ({...item, selectForEdit: false}))
    const [items, setItems] = useState(newItemsArr)

    // todo add handler for selecting a item
    
    return (
        <List>
            {
                items.map(item => {

                    return (
                        <ShoppingListListItemEdit
                            key={item.id} 
                            itemObj={{...item, listId: listObj.id}} 
                        />
                    )
                })
            }
        </List>
    )
}