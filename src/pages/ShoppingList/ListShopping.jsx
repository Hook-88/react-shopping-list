import { useEffect, useState } from "react"
import List from "../../components/List/List"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../../firebase/firebase"

export default function ListShopping({listObj}) {
    const [list, setList] = useState([])

    useEffect(() => {
        const unsub = onSnapshot(collection(db, `shoppingList/${listObj.id}/items`), snapshot => {
            // sync up with local state
            const newArr = snapshot.docs.map(doc => (
                {
                    ...doc.data(),
                    id: doc.id
                }
            ))

            setList(newArr)
        })

        return unsub
    }, [])
    
    return (
        <div>
            <small>{listObj.name.toUpperCase()}</small>
            <List>
                {
                    list.map(item => {

                        return (
                            <List.Item
                                key={item.id}
                            >
                                {item.name}
                            </List.Item>
                        )
                    })
                }
            </List>
        </div>
    )
}