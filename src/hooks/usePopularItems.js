import { collection, query, where, orderBy, getDocs } from "firebase/firestore"
import { useState, useEffect } from "react"
import { db } from "../firebase"
import useShoppingListItems from "./useShoppingListItems"

export default function usePopularItems() {
    const shoppingList = useShoppingListItems()
    const [popularItems, setPopularItems] = useState(null)

    useEffect(() => {
        getPopularFirebaseItems()
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

    return popularItems
}