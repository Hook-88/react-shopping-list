import { useContext } from "react"
import { ListContext } from "./List"
import { doc, updateDoc, getDoc } from "firebase/firestore"
import { db } from "../../firebase/firebase"

export default function ListList({children}) {
    const { listArr } = useContext(ListContext)

    return (    
        <ul className="space-y-2">
            {
                children(listArr)
            }
        </ul>
    )
}