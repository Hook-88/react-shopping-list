import ListItem from "./ListItem"

export default function List({children, listObj}) {
    
    return (
        <div>
            <small className="ml-4">{listObj.name.toUpperCase()}</small>

            <ul className="space-y-2">
                {children}
            </ul>
        </div>
    )
}

List.Item = ListItem