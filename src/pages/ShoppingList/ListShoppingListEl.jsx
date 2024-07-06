import { useAtom } from "jotai"
import { listFiltersAtom } from "../../store/store"
import ListDefault from "./ListDefault"
import ListFilterNotSelected from "./ListFilterNotSelected"
import ListHeader from "./ListHeader"

export default function ListShoppingListEl() {
    const [filter, setFilter] = useAtom(listFiltersAtom)
    
    return (
        <div>
            <ListHeader />
            {
                filter ? <ListFilterNotSelected /> : <ListDefault />
            }
        </div>

    )
}