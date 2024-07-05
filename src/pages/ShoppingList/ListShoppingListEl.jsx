import { useAtom, useAtomValue } from "jotai"
import { listFiltersAtom, shoppingListAtom } from "../../store/store"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase"
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