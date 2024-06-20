import { collection, onSnapshot } from "firebase/firestore"
import List from "../../components/List/List"
import { db } from "../../firebase/firebase"
import { useEffect, useState } from "react"
import { editListOnAtom } from "./ShoppingListPage"
import { useAtomValue } from "jotai"
import ListDefault from "./ListDefault"
import ListEdit from "./ListEdit"

export default function ShoppingListList({listObj}) {
    const collectionRef = collection(db, `shoppingList/${listObj.id}/items`)
    const [listItems, setListItems] = useState(null)
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
            {
                !editListOn ?
                <ListDefault listObj={listObj} itemsArr={listItems}/> :
                <ListEdit listObj={listObj} itemsArr={listItems}/>
            }

        </div> : null
    )
}