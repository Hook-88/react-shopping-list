import ShoppingList from "./ShoppingList"
import HeaderMenu from "./HeaderMenu"

export default function ShoppingListPage() {
    
    return (
        <>
        <header className="py-2 px-4 grid grid-cols-9 font-bold text-lg fixed inset-x-0 top-0 bg-black/80">
            <h1 className="col-start-2 col-span-7 text-center">Shopping</h1>
            <HeaderMenu />
        </header>

        <main className="px-4 mt-12 flex flex-col gap-4">
            <ShoppingList />
        </main>
        </>
    )
    
}