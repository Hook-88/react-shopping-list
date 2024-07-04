import { useAtomValue } from "jotai"
import { shoppingListAtom } from "../../store/store"

export default function ShoppingListPage() {
    const shoppingList = useAtomValue(shoppingListAtom)
    
    return (
        <>
            <header className="bg-white/10 py-2">
                <h1 className="text-center text-lg font-bold">Shoping List</h1>
            </header>
            <main>
                {
                    shoppingList &&
                    <ul>
                        {
                            shoppingList.map(item => (
                                <li key={item.id}>{item.name}</li>
                            ))
                        }
                    </ul>
                }
            </main>
        </>
    )
}