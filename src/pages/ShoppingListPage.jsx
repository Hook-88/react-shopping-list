import { FaEllipsis, FaMinus, FaPlus } from "react-icons/fa6"
import { useAtom } from "jotai"
import { shoppingListAtom } from "../atom"

export default function ShoppingListPage() {
    const [shoppingList, setShoppingList] = useAtom(shoppingListAtom)

    return (
        <>
        <header className="py-2 px-4 grid grid-cols-9 font-bold text-lg">
            <h1 className="col-start-2 col-span-7 text-center">Shopping</h1>
            <button className="col-start-9">
                <FaEllipsis />
            </button>
        </header>

        <main className="px-4">
            <ul className="space-y-2">
                {
                    shoppingList.map(item => {
                        let liClassname = "py-2 px-4 border border-white/30 rounded-lg cursor-pointer flex"
                        
                        if (item.selected) {
                            liClassname += " bg-green-900"
                        }

                        return (
                            <li 
                                key={item.id}
                                className={liClassname}
                            >
                                {item.name}
                                &nbsp;
                                { item.quantity > 1 && `(${item.quantity}x)` }

                                {
                                    !item.selected &&
                                    <div className="flex gap-2 ml-auto">
                                        <button className="border border-white/30 rounded-lg p-1 bg-red-900">
                                            <FaMinus />
                                        </button>
                                        <button className="border border-white/30 rounded-lg p-1 bg-sky-900">
                                            <FaPlus />
                                        </button>
                                    </div>
                                }

                            </li>
                        )
                        
                    })
                }
            </ul>
        </main>
        </>
    )
    
}