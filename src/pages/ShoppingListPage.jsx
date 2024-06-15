import { FaEllipsis, FaMinus, FaPlus } from "react-icons/fa6"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { shoppingListAtom } from "../atom"
import { useEffect } from "react"
import { doc, onSnapshot, updateDoc } from "firebase/firestore"
import { db } from "./../firebase/firebase"
import Menu from "../components/Menu/Menu"
import ShoppingListEl from "./ShoppingListEl"
import Card from "../components/Card"
import HeaderMenu from "./HeaderMenu"
import AddItemCard, { AddItemCardAtom } from "./AddItemCard"
import Button from "../components/Buttons/Button"
import { nanoid } from "nanoid"


export default function ShoppingListPage() {
    const [shoppingList, setShoppingList] = useAtom(shoppingListAtom)
    const openAddItemCard = useAtomValue(AddItemCardAtom)
    const docRef = doc(db, "shoppingList", "DhAnx7FUB4kZNnEgPRWS")

    async function deleteSelectedItems() {
        const newArray = shoppingList.items.filter(item => item.selected === false)
        
        await updateDoc(docRef, {items: newArray})
    }

    async function AddItemToShoppingList(value) {
        const newItemObj = {
            id: nanoid(),
            name: value.trim().toLowerCase(),
            selected: false,
            quantity: 1
        }

        await updateDoc(docRef, {items: [...shoppingList.items, newItemObj]})
    }

    useEffect(() => {
        const unsub = onSnapshot(docRef, snapshot => {
            //sync up with local state
            setShoppingList(snapshot.data())

        })

        return unsub
    }, [])

    console.log(shoppingList)
    
    return (
        <>
        <header className="py-2 px-4 grid grid-cols-9 font-bold text-lg fixed inset-x-0 top-0 bg-black/40 backdrop-blur">
            <h1 className="col-start-2 col-span-7 text-center">Shopping</h1>
            <HeaderMenu />
        </header>

        <main className="px-4 mt-12 flex flex-col gap-4">
            <ShoppingListEl />
            <AddItemCard 
                onSubmit={AddItemToShoppingList}
            />
            {   
                !openAddItemCard &&
                <Card className="grid fixed bottom-2 inset-x-0 mx-4 bg-black/40 backdrop-blur">
                    <Button 
                        className="bg-red-900 disabled:bg-red-900/50 disabled:text-white/50"
                        onClick={deleteSelectedItems}
                        // disabled={shoppingList && !shoppingList?.items.some(item => item.selected === true)}
                    >
                        Delete checked
                    </Button>
                </Card>
            }
        </main>
        </>
    )
    
}