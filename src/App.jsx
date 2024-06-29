import { onSnapshot, collection } from "firebase/firestore"
import { db } from "./firebase/firebase"
import { useEffect } from "react"
import { shoppingListAtom } from "./store/store"
import { useSetAtom } from "jotai"
import ShoppingListContextComponent from "./pages/ShoppingList/ShoppingListContextComponent"
import FormContextComponent from "./Context/FormContextComponent"
import FilterContextComponent from "./Context/FilterContextComponent"
import AppBrowserRouter from "./AppBrowserRouter"
import DialogConfirm from "./components/DialogConfirm/DialogConfirm"
import RecipeState from "./pages/Recipe/RecipeState"

export default function App() {
    const setShoppingList = useSetAtom(shoppingListAtom)

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "shoppingList"), snapshot => {
            const newArr = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))

            setShoppingList(newArr.filter(item => item.id !== "history"))
        })

        return unsub
    }, [])

    return (
        <FormContextComponent>
            <FilterContextComponent>
                <DialogConfirm>
                    <ShoppingListContextComponent>
                        <RecipeState>
                            <AppBrowserRouter />
                        </RecipeState>
                    </ShoppingListContextComponent>
                </DialogConfirm>
            </FilterContextComponent>
        </FormContextComponent>
    )
  }