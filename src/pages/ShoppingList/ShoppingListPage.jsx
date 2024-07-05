import { useAtomValue } from "jotai"
import { shoppingListAtom } from "../../store/store"
import getStringFirstCharCap from "../../utility/getStringFirstCharCap"
import { FaMinus, FaPlus } from "react-icons/fa6"

export default function ShoppingListPage() {
    const shoppingList = useAtomValue(shoppingListAtom)
    
    return (
        <>
            <header className="bg-white/10 py-2">
                <h1 className="text-center text-lg font-bold">Shoping List</h1>
            </header>
            <main className="p-4">
                {
                    shoppingList &&
                    <>
                        <div className="flex items-center justify-between px-4 mb-1">
                            <small>(4/4)</small>
                            <button className="flex items-center">
                                <small>Hide selected</small>
                            </button>
                        </div>
                        <ul>
                            {
                                shoppingList.map(item => (
                                    <li 
                                        key={item.id}
                                        className="py-2 px-4 border border-transparent mb-3 rounded-md bg-white/10 flex items-center"
                                    >
                                        {getStringFirstCharCap(item.name)}
                                        {
                                            item.quantity > 1 &&
                                            <>
                                                &nbsp;
                                                ({item.quantity}x)
                                            </>
                                        }
                                        <div className="flex gap-2 ml-auto">
                                            {
                                                item.quantity > 1 &&    
                                                <button className="p-1 border rounded-md">
                                                    <FaMinus />
                                                </button>
                                            }
                                            <button className="p-1 border rounded-md">
                                                <FaPlus />
                                            </button>

                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </>
                }
            </main>
        </>
    )
}