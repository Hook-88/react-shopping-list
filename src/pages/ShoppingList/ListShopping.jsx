import { useEffect, useState } from "react"
import List from "../../components/List/List"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../../firebase/firebase"
import AddButton from "../../components/Buttons/AddButton"
import SubtractButton from "../../components/Buttons/SubtractButton"

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
                                {
                                    item.quantity > 1 &&
                                    <>
                                        &nbsp;
                                        {`(${item.quantity}x)`}
                                    </>
                                }
                                
                                <div className="ml-auto flex gap-2">
                                    <SubtractButton />
                                    <AddButton />
                                </div>
                            </List.Item>
                        )
                    })
                }
            </List>
        </div>
    )
}