import { useAtom, useAtomValue } from "jotai"
import { pageFormsOpenAtom, shoppingListAtom } from "../../store/store"
import { FaEllipsis, FaMinus, FaPlus } from "react-icons/fa6"
import ListShoppingListEl from "./ListShoppingListEl"
import AddItemEl from "./AddItemEl"
import Menu from "../../components/Menu/Menu"
import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../../firebase"
import MenuShoppingListPage from "./MenuShoppingListPage"

export default function ShoppingListPage() {
    const shoppingList = useAtomValue(shoppingListAtom)
    const formOn = useAtomValue(pageFormsOpenAtom)


    return (
        <>
            <header className="bg-white/10 py-2 grid grid-cols-6 px-4">
                <h1 className="text-center text-lg font-bold col-span-4 col-start-2">Shoping List</h1>
                <MenuShoppingListPage />
            </header>
            <main className="p-4 flex flex-col gap-4">
                {
                    shoppingList &&
                    <ListShoppingListEl />
                }
                {
                    formOn && <AddItemEl />
                }
                
            </main>
            
            <div className="bg-black/20 backdrop backdrop-blur-sm fixed inset-0 flex items-center justify-center">
                <div className="p-4 bg-white/10 rounded-md">
                    <p className="text-center">Are you sure?</p>
                    <div className="flex gap-2 mt-4">
                        <button className="bg-green-900 px-6 py-1 rounded-md border border-white/10 flex-grow">
                            Yes
                        </button>
                        <button className="bg-red-900 px-2 py-1 rounded-md border border-white/10">
                            No
                        </button>

                    </div>
                </div>
            </div>
        </>
    )
}