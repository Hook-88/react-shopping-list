import { BrowserRouter, Route, Routes } from "react-router-dom"
import { onSnapshot, collection } from "firebase/firestore"
import { db } from "./firebase/firebase"
import { useEffect } from "react"
import { shoppingListAtom } from "./store/store"
import ShoppingListPage from "./pages/ShoppingList/ShoppingListPage"
import { useSetAtom } from "jotai"

export default function App() {
    const setShoppingList = useSetAtom(shoppingListAtom)

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
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ShoppingListPage />}/>
            </Routes>
        </BrowserRouter>
    )
  }