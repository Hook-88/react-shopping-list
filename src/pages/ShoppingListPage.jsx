import { useEffect, useState } from "react"
import IconMore from "../components/Icons/IconMore"
import { doc, onSnapshot, collection } from "firebase/firestore"
import { db } from "../firebase/firebase"
import List from "../components/List/List"
import { useAtom } from "jotai"
import { shoppinglistsNames } from "../store/store"
import ShoppingListList from "./ShoppingListList"


export default function ShoppingListPage() {
    const [shoppingListsNames, setShoppingListsNames] = useAtom(shoppinglistsNames)

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "shoppingList"), snapshot => {
            //sync up with local state)
            const newArray = snapshot.docs.map(doc => {
                return {
                    ...doc.data(),
                    id: doc.id
                }
            })

            setShoppingListsNames(newArray)
        })

        return unsub
    }, [])

    
    return (
        <>
        <header className="py-2 px-4 grid grid-cols-9 font-bold text-lg fixed inset-x-0 top-0 bg-black/40 backdrop-blur">
            <h1 className="col-start-2 col-span-7 text-center">Shopping</h1>
            <IconMore />
        </header>

        <main className="px-4 mt-12 flex flex-col gap-4">
            {
                shoppingListsNames ? 
                shoppingListsNames.map(list => {

                    return (
                        <ShoppingListList key={list.id} listNameObj={list}>
                            <List.Item>test</List.Item>
                        </ShoppingListList>
                    )
                }) : null
            }
        </main>
        </>
    )
    
}