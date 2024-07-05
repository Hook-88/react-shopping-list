import { useAtom, useAtomValue } from "jotai"
import { listFiltersAtom, shoppingListAtom } from "../../store/store"
import ListItemDefault from "./ListItemDefault"
import ListItemSelected from "./ListItemSelected"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase"
import { FaEye, FaEyeSlash } from "react-icons/fa6"
import ListDefault from "./ListDefault"
import ListFilterNotSelected from "./ListFilterNotSelected"

export default function ListShoppingListEl() {
    const shoppingList = useAtomValue(shoppingListAtom)
    const [filter, setFilter] = useAtom(listFiltersAtom)
    const numOfCheckedItems = shoppingList.filter(item => item.selected === true).length

    async function toggleFirebaseItemSelect(itemId) {
        const docRef = doc(db, "shoppingList", itemId)
        const docSnap = await getDoc(docRef)

        await updateDoc(docRef, {selected: !docSnap.data().selected})
    }

    function toggleFilterSelected() {
        if (filter) {
            setFilter(null)
            
            return
        }

        setFilter("!selected")
    }
    
    return (
        <>
            <div className="flex items-center justify-between px-4 mb-1">
                <small>
                    {`(${numOfCheckedItems}/${shoppingList.length})`}
                </small>

                <button 
                    className="flex items-center disabled:text-white/50" 
                    onClick={toggleFilterSelected}
                    disabled={numOfCheckedItems === 0}

                >
                    <small className="flex items-center gap-1">
                        {
                            filter ? 
                            <>
                                Show selected
                                <FaEye />
                            </> :
                            <>
                                Hide selected
                                <FaEyeSlash />
                            </>
                        }
                    </small>
                </button>
            </div>

            {
                filter ? <ListFilterNotSelected /> : <ListDefault />
            }

        </>

    )
}