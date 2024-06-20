import { useEffect, useState } from "react"
import IconMore from "../../components/Icons/IconMore"
import { doc, onSnapshot, collection } from "firebase/firestore"
import { db } from "../../firebase/firebase"
import List from "../../components/List/List"
import { shoppinglistsNames } from "../../store/store"
import ShoppingListList from "./ShoppingListList"
import Menu from "../../components/Menu/Menu"
import HeaderMenu from "./HeaderMenu"
import { atom, useAtom, useAtomValue } from "jotai"

export const editListOnAtom = atom(false)

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
        <header className="py-2 px-4 grid grid-cols-9 font-bold text-lg fixed inset-x-0 top-0 bg-black/80">
            <h1 className="col-start-2 col-span-7 text-center">Shopping</h1>
            <HeaderMenu />
        </header>

        <main className="px-4 mt-12 flex flex-col gap-4">
            {
                shoppingListsNames ? 
                shoppingListsNames.map(list => {

                    return (
                        <ShoppingListList key={list.id} listObj={list}/>
                    )
                }) : null
            }
        </main>
        </>
    )
    
}