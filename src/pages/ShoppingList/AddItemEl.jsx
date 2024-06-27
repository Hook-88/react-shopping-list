import { useEffect, useState } from "react"
import AddItemForm from "./AddItemForm"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../../firebase/firebase"

export default function AddItemEl() {
    const [popularItemsArr, setPopularItemsArr] = useState(null)

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "shoppingList/history/items"), snapshot => {
            const arr = snapshot.docs
                .map(doc => ({...doc.data(), id: doc.id}))
                .sort((a, b) => b.quantity - a.quantity)
            const topItems = arr.slice(0, 10)

            setPopularItemsArr(topItems)
        })

        return unsub
    }, [])

    console.log(popularItemsArr)
    
    return (
        <>
            <AddItemForm />
            {
                popularItemsArr ?
                popularItemsArr.map(item => <p key={item.id}>{item.name}</p>) : null
            }
        </>
    )
}