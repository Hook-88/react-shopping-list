import { useAtomValue, useSetAtom } from "jotai"
import { pageFormsOpenAtom, shoppingListAtom } from "../../store/store"
import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, orderBy, where } from "firebase/firestore"
import { db } from "../../firebase"
import { useEffect, useState } from "react"
import getStringFirstCharCap from "../../utility/getStringFirstCharCap"

export default function AdditemListPopularItems() {
    const shoppingList = useAtomValue(shoppingListAtom)
    const [populairItems, setPopularItems] = useState(null)

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
                    const itemNameArr = shoppingList.map(item => item.name)

                    if (!itemNameArr.includes(doc.data().name)) {
                        
                        return doc
                    }
                })
                .map(doc => ({...doc.data(), id: doc.id}))
        )

        setPopularItems(popularUniqueItemsArr.slice(0, 5))
    }

    function handleClick(itemName) {
        addItemToFirebase(itemName)
    }

    async function addItemToFirebase(itemName) {
        const itemObj = {
            name: itemName.trim().toLowerCase(),
            quantity: 1,
            selected: false
        }
        const collectionRef = collection(db, "shoppingList")
        
        await addDoc(collectionRef, itemObj)
    }
    
    return (
        populairItems?.length > 0 ?
        <ul className="flex flex-wrap-reverse gap-2 mb-4">
            {
                populairItems?.map(item => (
                    <li 
                        key={item.id}
                        className="p-2 px-4 border border-white/30 flex-grow text-center rounded-md"
                        onClick={() => handleClick(item.name)}
                    >
                        {getStringFirstCharCap(item.name)}
                    </li>
                ))
            }
        </ul> : null
    )
}