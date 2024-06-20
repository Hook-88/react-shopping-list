import { useEffect, useState } from "react"
import IconMore from "../../components/Icons/IconMore"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../../firebase/firebase"
import List from "../../components/List/List"

export default function ShoppingListPage() {
    const [shoppingLists, setShoppingLists] = useState([])

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "shoppingList"), snapshot => {
            //sync with local state
            const newArr = snapshot.docs.map(doc => (
                {
                    ...doc.data(),
                    id: doc.id
                }
            ))

            setShoppingLists(newArr)            
        })

        return unsub
    }, [])

    console.log(shoppingLists)
    
    return (
        <>
        <header className="py-2 px-4 grid grid-cols-9 font-bold text-lg fixed inset-x-0 top-0 bg-black/80">
            <h1 className="col-start-2 col-span-7 text-center">Shopping</h1>
            <IconMore />
        </header>

        <main className="px-4 mt-12 flex flex-col gap-4">
            {
                shoppingLists.map(list => {

                    return (
                        <div key={list.id}>
                            <small>{list.name.toUpperCase()}</small>

                        </div>
                    )
                })
            }
        </main>
        </>
    )
    
}