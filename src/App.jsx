import { BrowserRouter, Routes, Route } from "react-router-dom"
import ShoppingListPage from "./pages/ShoppingList/ShoppingListPage"
import { useAtom, useSetAtom } from "jotai"
import { shoppingListAtom } from "./store/store"
import { useEffect } from "react"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { db } from "./firebase"

export default function App() {
    const setShoppingList = useSetAtom(shoppingListAtom)

    useEffect(() => {
        const collectionRef = collection(db, "shoppingList")
        const q = query(collectionRef, where("name", "!=", "history"))
        const unsub = onSnapshot(q, snapshot => {
            const arr = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}))

            setShoppingList(arr)
        })

        return unsub
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ShoppingListPage />}/>
            </Routes>
        </BrowserRouter>
    )
  }