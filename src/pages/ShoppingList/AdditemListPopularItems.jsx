import { addDoc, collection } from "firebase/firestore"
import { db } from "../../firebase"
import getStringFirstCharCap from "../../utility/getStringFirstCharCap"
import { logAddItem } from "../../utility/firestoreFn/logAddItem"

export default function AdditemListPopularItems({populairItems}) {

    function handleClick(itemName) {    
        addItemToFirebase(itemName)
        logAddItem(itemName)
    }

    async function addItemToFirebase(itemName) {
        const itemObj = {
            name: itemName.trim().toLowerCase(),
            quantity: 1,
            selected: false
        }
        const collectionRef = collection(db, "shoppingList")
        
        await addDoc(collectionRef, itemObj)
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