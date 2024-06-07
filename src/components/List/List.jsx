import ListItem from "./ListItem"

export default function List({title, listArray, children, ...rest}) {
    
    return (
        <div {...rest}>
            {title && <small className="pl-4 font-thin">{title.toUpperCase()}</small>}
            
            <ul className="grid gap-2 mt-1">
                {
                
                    listArray.map(item => {

                        return (
                            <li
                                key={item.id}
                            >
                                {children(item)}
                            </li>
                        )
                    })
                
                }
            </ul>
        </div>
    )
}

List.Item = ListItem