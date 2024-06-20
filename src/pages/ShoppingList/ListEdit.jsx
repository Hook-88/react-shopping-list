import { createContext, useState } from "react"
import List from "../../components/List/List"
import ShoppingListListItemEdit from "./ShoppingListListItemEdit"

const ListEditContext = createContext()

export default function ListEdit({listObj, itemsArr}) {
    const newItemsArr = itemsArr.map(item => ({...item, selectForEdit: false}))
    const [items, setItems] = useState(newItemsArr)

    // todo add handler for selecting a item

    function selectItem(itemId) {
        setItems(prevItems => prevItems.map(item => item.id === itemId ? {...item, selectForEdit: true} : {...item, selectForEdit: false}))
    }
    
    return (
        <ListEditContext.Provider value={{selectItem}}>
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
        </ListEditContext.Provider>
    )
}

export { ListEditContext }