import getStringFirstCharCap from "../../utility/getStringFirstCharCap"
import { logAddItem } from "../../utility/firestoreFn/logAddItem"
import addItemToFirebase from "../../utility/firestoreFn/addFirebaseItem"

export default function AdditemListPopularItems({populairItems}) {

    function handleClick(itemName) {    
        addItemToFirebase(itemName)
        logAddItem(itemName)
    }
    
    return (
        populairItems?.length > 0 ?
        <ul className="flex flex-wrap-reverse gap-2 mb-4">
            {
                populairItems?.slice(0,5).map(item => (
                    <li 
                        key={item.id}
                        className="p-2 px-4 border border-white/30 flex-grow text-center rounded-md"
                        onClick={() => handleClick(item.name)}
                    >
                        {getStringFirstCharCap(item.name)}
                    </li>
                ))
            }
        </ul> : null
    )
}