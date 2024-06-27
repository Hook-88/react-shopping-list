import { ListContext } from "./List"
import { useContext } from "react"

export default function ListProgress({onClick = () => {}}) {
    const { listArr }  = useContext(ListContext)
    const listArrFilteredSelected = listArr.filter(item => item.selected === true)

    function handleClick() {
        if (listArrFilteredSelected.length === (listArr.length) && listArr.length > 0) {
            onClick()
        }
    }

    return (
        <small onClick={handleClick}>
            {`(${listArrFilteredSelected.length}/${(listArr.length)})`}
            {
                listArrFilteredSelected.length === (listArr.length) &&
                " - Completed"
            }
        </small>
    )
}