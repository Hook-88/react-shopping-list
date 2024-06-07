import { FaPlus } from "react-icons/fa6";

export default function ShoppingListPage() {
    
    return (
        <>
            <header className="grid grid-cols-6 py-2 text-lg px-2">
                <h1 className="col-span-4 col-start-2 text-center">SHOPPING</h1>
                <button className="flex items-center justify-center">
                    <FaPlus />
                </button>
            </header>
        </>
    )
}