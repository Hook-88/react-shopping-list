import ShoppingList from "./ShoppingList"
import HeaderMenu from "./HeaderMenu"
import AddItemToShoppingList from "./AddItemToShoppingList"
import { useStore } from "../../store/store"
import LinkNav from "../../components/LinkNav"

export default function ShoppingListPage() {
    const formData = useStore(state => state.formData)
    
    return (
        <>
        <header className="py-2 px-4 grid grid-cols-9 font-bold text-lg fixed inset-x-0 top-0 bg-black/80">
            <h1 className="col-start-2 col-span-7 text-center">Shopping</h1>
            <HeaderMenu />
        </header>

        <main className="px-4 mt-12 flex flex-col gap-4 pb-5">
            <ShoppingList />
            {
                formData ? 
                <AddItemToShoppingList /> : 
                <LinkNav to="/recipes">Recipes</LinkNav>
            }
        </main>
        </>
    )
    
}