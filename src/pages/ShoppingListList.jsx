import { useEffect, useState } from "react"
import List from "../components/List/List"
import ShoppingListListItem from "./ShoppingListListItem"
import { collection, doc, onSnapshot, updateDoc, getDoc } from "firebase/firestore"
import { db } from "../firebase/firebase"

export default function ShoppingListList({listNameObj}) {
    const [items, setItems] = useState([])

    useEffect(() => {
        const unsub = onSnapshot(collection(db, `shoppingList/${listNameObj.id}/items`), snapshot => {
            //sync up
            const newArray = snapshot.docs.map(doc => {

                return {
                    ...doc.data(),
                    id: doc.id
                }
            })

            setItems(newArray)
        })

        return unsub
    }, [])

    async function ToggleCheckItem(itemId) {
        const docRef = doc(db, `shoppingList/${listNameObj.id}/items`, itemId)
        const docSnap = await getDoc(docRef)

        await updateDoc(docRef, { selected: !docSnap.data().selected})

    }
    
    return (
        items ?
        <List listObj={listNameObj}>
            { items.map(item => {

                if (item.selected) {

                    return <ShoppingListListItem.Checked key={item.id} itemObj={item} onClick={() => ToggleCheckItem(item.id)}/>
                }

                return <ShoppingListListItem key={item.id} itemObj={{...item, listId: listNameObj.id}} onClick={() => ToggleCheckItem(item.id)}/>
            }) }
        </List> : null
    )
}