import { useContext, useEffect, useState } from "react"
import Card from "../../components/Card"
import AddItemToShoppingListForm from "./AddItemToShoppingListForm"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../../firebase/firebase"
import { ShoppingListContext } from "./ShoppingListContextComponent"
import getCapString from "./../../utility/getCapString"
import ListInlinePopularItems from "./ListInlinePopularItems"

export default function AddItemToShoppingListEl() {
    const [ popularItems, setPopularItems ] = useState(null)
    const { shoppingList } = useContext(ShoppingListContext)

    useEffect(() => {
        const collectionRef = collection(db, "shoppingList/history/items")
        const unsub = onSnapshot(collectionRef, collectionSnapshot => {
            const arr = 
                collectionSnapshot.docs
                    .map(doc => ({ ...doc.data(), id: doc.id}))
                    .sort((a, b) => b.quantity - a.quantity)

            const uniqueArr = filterArrayByNames(arr, shoppingList)

            setPopularItems(uniqueArr.slice(0,5))
        })

        return unsub
    }, [shoppingList])

    function filterArrayByNames(sourceArray, referenceArray) {
        return sourceArray.filter(sourceObj => 
            !referenceArray.some(refObj => refObj.name === sourceObj.name)
        )
    }
    
    return (
        popularItems ? 
        <Card className="px-2">
            <ListInlinePopularItems /> 
            <AddItemToShoppingListForm />
        </Card> : null
    )
}