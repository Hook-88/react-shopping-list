import { useEffect, useState, useRef } from "react"
import List from "../../components/List/List"
import { collection, onSnapshot, doc, getDoc, updateDoc, query, where } from "firebase/firestore"
import { db } from "../../firebase/firebase"
import AddButton from "../../components/Buttons/AddButton"
import SubtractButton from "../../components/Buttons/SubtractButton"
import ListShoppingItem from "./ListShoppingItem"
import ListShoppingItemChecked from "./ListShoppingItemChecked"

export default function ListShoppingFiltered({listObj}) {
    const [list, setList] = useState([])
    const originalListLengthRef = useRef(0)

    useEffect(() => {
        // const q = query(collection(db, `shoppingList/${listObj.id}/items`), where("selected", "==", false)); 

        const unsub = onSnapshot(collection(db, `shoppingList/${listObj.id}/items`), snapshot => {
            // sync up with local state
            const newArr = snapshot.docs.map(doc => (
                {
                    ...doc.data(),
                    id: doc.id
                }
            ))
            setList(newArr.filter(item => item.selected === false))
            originalListLengthRef.current = newArr.length
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
            <small>
                {listObj.name.toUpperCase()}
                &nbsp;
                {`(${list.length}/${originalListLengthRef.current})`}
            </small>
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