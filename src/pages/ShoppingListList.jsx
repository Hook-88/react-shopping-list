import { collection, onSnapshot } from "firebase/firestore"
import List from "../components/List/List"
import { db } from "../firebase/firebase"
import { useEffect, useState } from "react"
import ShoppingListListItem from "./ShoppingListListItem"
import ShoppingListListItemEdit from "./ShoppingListListItemEdit"
import { editListOnAtom } from "./ShoppingListPage"
import { useAtomValue } from "jotai"

// TODO add state for edit view

export default function ShoppingListList({listObj}) {
    const collectionRef = collection(db, `shoppingList/${listObj.id}/items`)
    const [listItems, setListItems] = useState(null)
    // const [editListOn, setEditListOn] = useAtom(editListOnAtom)
    const editListOn = useAtomValue(editListOnAtom)

    useEffect(() => {
        const unsub = onSnapshot(collectionRef, snapshot => {
            const newArray = snapshot.docs.map(doc => {

                return {
                    ...doc.data(),
                    id: doc.id
                }
            })

            setListItems(newArray)
        })

        return unsub
    }, [])

    return (
        listItems ?
        <div>
            <small className="ml-4">{listObj.name.toUpperCase()}</small>
            <List>
                {
                    listItems.map(item => {

                        return (
                            editListOn ? 
                            <ShoppingListList.ItemEdit 
                                key={item.id} 
                                itemObj={{...item, listId: listObj.id}} 
                            /> : 

                            <ShoppingListList.Item 
                                key={item.id} 
                                itemObj={{...item, listId: listObj.id}} 
                            />
                        )
                    })
                }
            </List>
        </div> : null
    )
}

ShoppingListList.Item = ShoppingListListItem
ShoppingListList.ItemEdit = ShoppingListListItemEdit