import { useEffect, useState } from "react"
import IconMore from "../../components/Icons/IconMore"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../../firebase/firebase"
import List from "../../components/List/List"
import ListShopping from "./ListShopping"
import Card from "../../components/Card"
import Form from "../../components/Form"
import Button from "../../components/Buttons/Button"
import AddItemForm from "./AddItemForm"
import { useAtom, useAtomValue } from "jotai"
import { addNewItemAtom } from "../../store/store"
import HeaderMenu from "./HeaderMenu"


export default function ShoppingListPage() {
    const [shoppingLists, setShoppingLists] = useState([])
    const [addNewItemOn, setAddNewItemOn] = useAtom(addNewItemAtom)

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
    
    return (
        <>
        <header className="py-2 px-4 grid grid-cols-9 font-bold text-lg fixed inset-x-0 top-0 bg-black/80">
            <h1 className="col-start-2 col-span-7 text-center">Shopping</h1>
            <HeaderMenu />
        </header>

        <main className="px-4 mt-12 flex flex-col gap-4">
            {
                shoppingLists.map(list => {

                    return (
                        <ListShopping key={list.id} listObj={list} />
                    )
                })
            }
            {
                addNewItemOn && <AddItemForm />
            }
        </main>
        </>
    )
    
}