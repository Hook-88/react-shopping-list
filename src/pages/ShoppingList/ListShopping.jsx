import { useEffect, useState } from "react"
import List from "../../components/List/List"
import { collection, onSnapshot, doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase/firebase"
import AddButton from "../../components/Buttons/AddButton"
import SubtractButton from "../../components/Buttons/SubtractButton"
import ListShoppingItem from "./ListShoppingItem"
import ListShoppingItemChecked from "./ListShoppingItemChecked"

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

    async function toggleChecked(itemId) {
        const docRef = doc(db, `shoppingList/${listObj.id}/items`, itemId)
        const docSnap = await getDoc(docRef)
        
        await updateDoc(docRef, {selected: !docSnap.data().selected})
    }
    
    return (
        <div>
            <small>{listObj.name.toUpperCase()}</small>
            <List>
                {
                    list.map(item => {

                        return item.selected ?
                            <ListShoppingItemChecked 
                                key={item.id}
                                itemObj={item}
                                collectionUrl={`shoppingList/${listObj.id}/items`}
                                toggleChecked={toggleChecked}
                            /> :
                        
                            <ListShoppingItem
                                key={item.id}
                                itemObj={item}
                                collectionUrl={`shoppingList/${listObj.id}/items`}
                                toggleChecked={toggleChecked}
                            />
                        
                    })
                }
            </List>
        </div>
    )
}