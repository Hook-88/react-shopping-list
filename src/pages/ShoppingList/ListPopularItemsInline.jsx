import { addDoc, collection, doc, getDoc, getDocs, updateDoc, query, where, onSnapshot } from "firebase/firestore"
import { db } from "../../firebase/firebase"
import Card from "../../components/Card"
import { useState, useEffect } from "react"
import getCapString from "../../utility/getCapString"
import { useAtomValue } from "jotai"
import { shoppingListAtom } from "../../store/store"

export default function ListPopularItemsInline() {
    const [popularItemsArr, setPopularItemsArr] = useState(null)
    const shoppingList = useAtomValue(shoppingListAtom)

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "shoppingList/history/items"), snapshot => {
            const arr = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}))
            const filterArr = filterArrayByNames(arr, shoppingList).sort((a, b) => b.quantity - a.quantity)

            console.log(filterArr.slice(0, 5))
            
            const topItems = arr.slice(0, 5)

            setPopularItemsArr(topItems)
        })

        return unsub
    }, [])

    function filterArrayByNames(sourceArray, referenceArray) {
        return sourceArray.filter(sourceObj => 
            !referenceArray.some(refObj => refObj.name === sourceObj.name)
        )
    }

    async function addItemToFirebase(historyItemId) {
        const collectionRef = collection(db, "shoppingList")
        const itemObj = {
                name: popularItemsArr.find(item => item.id === historyItemId).name,
                quantity: 1,
                selected: false
            }

        await addDoc(collectionRef, itemObj)
    }

    async function modifyQuantityHistoryItem(historyItemId) {
        const docRef = doc(db, "shoppingList/history/items", historyItemId)
        const docSnap = await getDoc(docRef)

        await updateDoc(docRef, {quantity: docSnap.data().quantity + 1})
    }

    function handleClick(event) {
        addItemToFirebase(event.target.parentElement.id)
        modifyQuantityHistoryItem(event.target.parentElement.id)
    }

    console.log(shoppingList)
    
    return (
        <ul className="col-span-6 flex flex-wrap-reverse gap-2">
            {
                popularItemsArr ? 
                    popularItemsArr.map(
                        (item, index, arr) => (
                            <li 
                                key={item.id}
                                className="flex-grow"
                                onClick={handleClick}
                                id={item.id}
                            >
                                <Card 
                                    className="text-center"
                                >
                                    {`${index + 1}. ${getCapString(item.name)}`}
                                </Card>

                            </li>
                        )
                    ) : null
            }
        </ul>
    )
}