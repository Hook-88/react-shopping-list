import { FaEllipsis, FaMinus, FaPlus } from "react-icons/fa6"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { shoppingListAtom } from "../atom"
import { useEffect } from "react"
import { doc, onSnapshot, updateDoc } from "firebase/firestore"
import { db } from "./../firebase/firebase"
import Menu from "../components/Menu/Menu"
import ShoppingListEl from "./ShoppingListEl"
import Card from "../components/Card"
import Button from "../components/Buttons/Button"
import Form from "../components/Form"
import AddItemCard from "./AddItemCard"
import HeaderMenu from "./HeaderMenu"
import { nanoid } from "nanoid"
import { AddItemCardAtom } from "./AddItemCard"

export default function ShoppingListPage() {
    const [shoppingList, setShoppingList] = useAtom(shoppingListAtom)
    const AddItemCardAtomOpen = useAtomValue(AddItemCardAtom)
    const docRef = doc(db, "shoppingList", "DhAnx7FUB4kZNnEgPRWS")

    useEffect(() => {
        const unsub = onSnapshot(docRef, snapshot => {
            //sync up with local state
            setShoppingList(snapshot.data())

        })

        return unsub
    }, [])

    function AddItemToShoppingList(value) {
        const itemObj = {
            id: nanoid(),
            name: value,
            selected: false, 
            quantity: 1
        }
        const newArray = [...shoppingList.items, itemObj]

        updateDoc(docRef, {items: newArray})
    }

    function deleteSelectedItems() {
        const newArray = shoppingList.items.filter(item => item.selected === false)

        updateDoc(docRef, {items: newArray})
    }

    return (
        <>
        <header className="py-2 px-4 grid grid-cols-9 font-bold text-lg fixed inset-x-0 top-0 bg-black/40 backdrop-blur">
            <h1 className="col-start-2 col-span-7 text-center">Shopping</h1>
            <HeaderMenu />
        </header>

        <main className="px-4 mt-12 flex flex-col gap-4">
            <ShoppingListEl />
            <AddItemCard onSubmit={AddItemToShoppingList}/>
            {
                !AddItemCardAtomOpen &&
                <Card className="grid fixed bottom-2 inset-x-0 mx-4 bg-black/40 backdrop-blur">
                    <Button 
                        className="bg-red-900 disabled:bg-red-900/50 disabled:text-white/50"
                        onClick={deleteSelectedItems}
                        disabled={!shoppingList?.items.some(item => item.selected === true)}
                    >
                        Delete checked
                    </Button>
                </Card>
            }
        </main>
        </>
    )
    
}