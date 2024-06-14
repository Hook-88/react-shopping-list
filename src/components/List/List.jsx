import ListItem from "./ListItem"

export default function List({children}) {
    
    return (
        <ul className="space-y-2">
           {children}
        </ul>
    )
}

List.Item = ListItem