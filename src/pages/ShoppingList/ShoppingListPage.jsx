import { useContext } from "react"
import PageHeader from "../../components/PageHeader/PageHeader"
import { ShoppingListContext } from "./ShoppingListContextComponent"
import ListShoppingListEl from "./ListShoppingListEl"
import ShoppingListMenu from "./ShoppingListMenu"


export default function ShoppingListPage() {
    const { shoppingList } = useContext(ShoppingListContext)

    return (
        <>
            <PageHeader>
                <PageHeader.Title className="col-start-3 col-span-5">Shopping List</PageHeader.Title>
                <ShoppingListMenu />
            </PageHeader>
            <main className="mt-12 px-4 flex flex-col gap-4">
                {
                    shoppingList && <ListShoppingListEl />
                }
            </main>

            
        </>
    )
}