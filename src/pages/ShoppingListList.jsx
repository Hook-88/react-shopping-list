import { collection, onSnapshot } from "firebase/firestore"
import List from "../components/List/List"
import { db } from "../firebase/firebase"
import { useEffect, useState } from "react"
import ShoppingListListItem from "./ShoppingListListItem"

export default function ShoppingListList({listObj}) {
    const collectionRef = collection(db, `shoppingList/${listObj.id}/items`)
    const [listItems, setListItems] = useState(null)

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