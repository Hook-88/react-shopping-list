import { ListContext } from "./List"
import { useContext } from "react"

export default function ListProgress() {
    const { listArr }  = useContext(ListContext)
    const listArrFilteredSelected = listArr.filter(item => item.selected === true)

    
    return (
        <small>
            {`(${listArrFilteredSelected.length}/${listArr.length})`}
            {
                listArrFilteredSelected.length === listArr.length &&
                " - Completed"
            }
        </small>
    )
}