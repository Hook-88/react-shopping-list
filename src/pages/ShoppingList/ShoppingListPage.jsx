import { useAtomValue } from "jotai"
import { shoppingListAtom } from "../../store/store"
import PageHeader from "../../components/PageHeader/PageHeader"
import Card from "../../components/Card"
import ButtonAdd from "../../components/Buttons/ButtonAdd"
import ButtonSubtract from "../../components/Buttons/ButtonSubtract"

export default function ShoppingListPage() {
    const shoppingList = useAtomValue(shoppingListAtom)  
    
    console.log(shoppingList)
    
    return (
        <>
            <PageHeader>
                <PageHeader.Title className="col-start-3 col-span-5">Shopping List</PageHeader.Title>
            </PageHeader>
            <main className="mt-12 px-4">
                <ul className="space-y-2">
                    {
                        shoppingList.map(
                            item => (
                                <li 
                                    key={item.id}
                                >   
                                    <Card className="flex items-center justify-between">
                                        {item.name}
                                        <div className="flex gap-2">
                                            <ButtonSubtract />
                                            <ButtonAdd />
                                        </div>
                                    </Card>
                                </li>
                            )
                        
                        )
                    }
                </ul>
            </main>
        </>
    )
}