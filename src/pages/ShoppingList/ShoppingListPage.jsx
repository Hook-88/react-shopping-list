import { useAtomValue } from "jotai"
import { shoppingListAtom } from "../../store/store"
import PageHeader from "../../components/PageHeader/PageHeader"

export default function ShoppingListPage() {
    const shoppingList = useAtomValue(shoppingListAtom)  
    
    console.log(shoppingList)
    
    return (
        <>
            <PageHeader>
                <PageHeader.Title className="col-start-3 col-span-5">Shopping List</PageHeader.Title>
            </PageHeader>
            <main className="mt-12 px-4">
                <ul>
                    {
                        shoppingList.map(
                            item => (
                                <li 
                                    key={item.id}
                                    className="py-2 px-4 border border-white/30 rounded-lg cursor-pointer flex"
                                >
                                    {item.name}
                                </li>
                            )
                        
                        )
                    }
                </ul>
            </main>
        </>
    )
}