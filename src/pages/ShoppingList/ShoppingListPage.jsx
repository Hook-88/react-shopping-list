import IconMore from "../../components/Icons/IconMore"
import { addDoc, collection, onSnapshot } from "firebase/firestore"
import { db } from "../../firebase/firebase"
import { useEffect, useState } from "react"
import List from "../../components/List/List"
import ShoppingList from "./ShoppingList"



export default function ShoppingListPage() {
    const [shoppingList, setShoppingList] = useState([])

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "shoppingList"), snapshot => {
            const newArr = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))

            setShoppingList(newArr)
        })

        return unsub
    }, [])
    
    return (
        <>
        <header className="py-2 px-4 grid grid-cols-9 font-bold text-lg fixed inset-x-0 top-0 bg-black/80">
            <h1 className="col-start-2 col-span-7 text-center">Shopping</h1>
            <IconMore />
        </header>

        <main className="px-4 mt-12 flex flex-col gap-4">
            {
                shoppingList.length > 1 ?
                <ShoppingList listArr={shoppingList} /> : null
            }
        </main>
        </>
    )
    
}