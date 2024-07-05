import { useAtom, useAtomValue } from "jotai"
import { confirmDialogAtom, pageFormsOpenAtom, shoppingListAtom } from "../../store/store"
import ListShoppingListEl from "./ListShoppingListEl"
import AddItemEl from "./AddItemEl"
import MenuShoppingListPage from "./MenuShoppingListPage"
import ConfirmDialog from "../../components/ConfirmDialog.jsx/ConfirmDialog"
import { collection, query, where, orderBy, getDocs } from "firebase/firestore"
import { useState, useEffect } from "react"
import { db } from "../../firebase"

export default function ShoppingListPage() {
    const shoppingList = useAtomValue(shoppingListAtom)
    const [formOn, setFormOn] = useAtom(pageFormsOpenAtom)
    const openConfirmDialog = useAtomValue(confirmDialogAtom)
    const [populairItems, setPopularItems] = useState(null)

    useEffect(() => {
        getPopularFirebaseItems()

        if (shoppingList?.length === 0) {
            setFormOn(true)
        }

    }, [shoppingList])

    async function getPopularFirebaseItems() {
        const collectionRef = collection(db, "history/shoppingList/items")
        const q = query(collectionRef, where("quantity", ">", 1), orderBy("quantity", "desc"))
        const popularItemsArr = await getDocs(q)
        const popularUniqueItemsArr = (
            popularItemsArr.docs
                .filter(doc => {
                    const itemNameArr = shoppingList?.map(item => item.name)

                    if (!itemNameArr?.includes(doc.data().name)) {
                        
                        return doc
                    }
                })
                .map(doc => ({...doc.data(), id: doc.id}))
        )

        setPopularItems(popularUniqueItemsArr)
    }

    return (
        <>
            <header className="bg-white/10 py-2 grid grid-cols-6 px-4">
                <h1 className="text-center text-lg font-bold col-span-4 col-start-2">Shoping List</h1>
                <MenuShoppingListPage />
            </header>
            <main className="p-4 flex flex-col gap-4">
                { shoppingList?.length > 0 && <ListShoppingListEl /> }
                { formOn && <AddItemEl popularitemsArr={populairItems} /> }

            </main>
            {
                openConfirmDialog && <ConfirmDialog />
            }
        </>
    )
}