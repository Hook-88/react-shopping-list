import { FaEllipsis, FaMinus, FaPlus } from "react-icons/fa6"
import { useAtom } from "jotai"
import { shoppingListAtom } from "../atom"
import { useEffect } from "react"
import { doc, onSnapshot, updateDoc } from "firebase/firestore"
import { db } from "./../firebase/firebase"
import AddButton from "../components/Buttons/AddButton"
import SubtractButton from "../components/Buttons/SubtractButton"
import List from "../components/List/List"

export default function ShoppingListPage() {
    const [shoppingList, setShoppingList] = useAtom(shoppingListAtom)
    const docRef = doc(db, "shoppingList", "DhAnx7FUB4kZNnEgPRWS")

    async function toggleSelect(itemId) {
        const newArray = shoppingList.items.map(item => item.id === itemId ? {...item, selected: !item.selected} : item)

        updateDoc(docRef, {items: newArray})
    }

    async function modifyQuantity(itemId, num) {
        const newArray = shoppingList.items.map(item => item.id === itemId ? {...item, quantity: item.quantity + num} : item)

        updateDoc(docRef, {items: newArray})
    }

    useEffect(() => {
        const unsub = onSnapshot(docRef, snapshot => {
            //sync up with local state
            setShoppingList(snapshot.data())

        })

        return unsub
    }, [])

    return (
        <>
        <header className="py-2 px-4 grid grid-cols-9 font-bold text-lg fixed inset-x-0 top-0 bg-black/40 backdrop-blur">
            <h1 className="col-start-2 col-span-7 text-center">Shopping</h1>
            <button className="col-start-9">
                <FaEllipsis />
            </button>
        </header>

        <main className="px-4 mt-12">
            <List>
                {
                    shoppingList?.items && shoppingList.items.map(item => (
                        <List.Item 
                            key={item.id}
                            onClick={() => toggleSelect(item.id)}
                            itemObj={item}
                        >
                            <p className="border border-white/0">
                            {item.name}
                            &nbsp;
                            { item.quantity > 1 && `(${item.quantity}x)` }
                            </p>

                            {
                                !item.selected &&
                                <div className="flex gap-2 ml-auto">
                                    {
                                        item.quantity > 1 &&
                                        <SubtractButton 
                                            onClick={e => {
                                                e.stopPropagation()
                                                modifyQuantity(item.id, -1)
                                            }}
                                        />
                                    }
                                    <AddButton 
                                        onClick={e => {
                                            e.stopPropagation()
                                            modifyQuantity(item.id, 1)
                                        }}
                                    />       
                                </div>
                            }

                        </List.Item>
                    ))
                }
            </List>
        </main>
        </>
    )
    
}