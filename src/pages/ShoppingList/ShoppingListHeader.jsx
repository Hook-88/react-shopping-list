import ListProgress from "./ShoppingListProgress"
import ListFilterButton from "./ListFilterButton"
import List from "../../components/List/List"

export default function ShoppingListHeader() {
    
    return (
        <List.Header>          
            <ListProgress />
            <ListFilterButton />
        </List.Header>
    )
}