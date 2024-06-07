import ListItem from "./ListItem"
import ListItemSelected from "./ListItemSelected"

export default function List({title, children, ...rest}) {
    
    return (
        <div {...rest}>
            {title && <small className="pl-4 font-thin">{title.toUpperCase()}</small>}
            
            <ul className="grid gap-2 mt-1">
                {/* {
                
                    listArray.map(item => {

                        return (
                            <li
                                key={item.id}
                            >
                                {children(item)}
                            </li>
                        )
                    })
                
                } */}
                {children}
            </ul>
        </div>
    )
}

List.Item = ListItem
List.ItemSelected = ListItemSelected