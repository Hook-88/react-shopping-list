import ListItem from "./ListItem"
import ListHeader from "./ListHeader"
import ListProgress from "./ListProgress";

export default function List({children}) {
    
    return (
            <ul className="space-y-2">
                {children}
            </ul>
    )
}

List.Item = ListItem
List.Header = ListHeader
List.Progress = ListProgress