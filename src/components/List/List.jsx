import { createContext } from "react"
import ListHeader from "./ListHeader"
import ListProgress from "./ListProgress"
import ListList from "./ListList"

const ListContext = createContext()

export default function List({children, className, listArr}) {

    return (
        <ListContext.Provider value={{ listArr }}>
            <div className={className}>
                {children}
            </div>
        </ListContext.Provider>
    )
}

List.Header = ListHeader
List.Progress = ListProgress
List.List = ListList

export { ListContext }