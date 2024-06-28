import Card from "../../components/Card"
import AddItemToShoppingListForm from "./AddItemToShoppingListForm"
import ListInlinePopularItems from "./ListInlinePopularItems"

export default function AddItemToShoppingListEl() {
    
    return (
        <Card className="px-2">
            <ListInlinePopularItems /> 
            <AddItemToShoppingListForm />
        </Card>
    )
}