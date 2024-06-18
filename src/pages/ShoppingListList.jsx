import { useEffect, useState } from "react"
import List from "../components/List/List"
import ShoppingListListItem from "./ShoppingListListItem"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../firebase/firebase"
import AddButton from "../components/Buttons/AddButton"
import SubtractButton from "../components/Buttons/SubtractButton"

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
    
    return (
        items ?
        <List listObj={listNameObj}>
            { items.map(item => {

                return (
                    <List.Item key={item.id}>
                        {item.name}
                        &nbsp;
                        {`(${item.quantity}x)`}
                        <div className="ml-auto flex gap-2">
                            <SubtractButton />
                            <AddButton />
                        </div>
                    </List.Item>
                )
            }) }
        </List> : null
    )
}