import ListProgress from "./ListProgress"
import ListFilterButton from "./ListFilterButton"

export default function ListHeader() {
    
    return (
        <div className="grid grid-cols-6">          
            <ListProgress />
            <ListFilterButton />
        </div>
    )
}