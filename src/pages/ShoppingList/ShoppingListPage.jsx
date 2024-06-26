import { useAtomValue } from "jotai"
import { shoppingListAtom } from "../../store/store"
import PageHeader from "../../components/PageHeader/PageHeader"
import ShoppingListEl from "./ShoppingListEl"

export default function ShoppingListPage() {
    const shoppingList = useAtomValue(shoppingListAtom)  
    
    return (
        <>
            <PageHeader>
                <PageHeader.Title className="col-start-3 col-span-5">Shopping List</PageHeader.Title>
            </PageHeader>
            <main className="mt-12 px-4">
                <ShoppingListEl />
            </main>
        </>
    )
}