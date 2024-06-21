import { doc, getDoc, updateDoc } from "firebase/firestore"
import AddButton from "../../components/Buttons/AddButton"
import SubtractButton from "../../components/Buttons/SubtractButton"
import getCapString from "../../utility/getCapString"
import { db } from "../../firebase/firebase"
import { useStore } from "../../store/store"

export default function ItemDefault({itemId}) {
    const item = useStore(state => state.shoppingList.find(item => item.id === itemId))

    async function modifyQuantity(num) {
        const docRef = doc(db, "shoppingList", item.id)
        const docSnap = await getDoc(docRef)

        await updateDoc(docRef, { quantity: docSnap.data().quantity + num})
    }

    function handleClickSubtract(event) {
        event.stopPropagation()
        modifyQuantity(-1)
    }

    function handleClickAdd(event) {
        event.stopPropagation()
        modifyQuantity(1)
    }

    return (
        <div className="py-2 px-4 border border-white/30 rounded-lg cursor-pointer flex bg-white/5">
            {getCapString(item.name)}
            {
                item.quantity > 1 &&
                <>
                    &nbsp;
                    {`(${item.quantity}x)`}
                </>
            }
            <div className="ml-auto flex gap-2">
                {
                    item.quantity > 1 && 
                    <SubtractButton onClick={handleClickSubtract}/>
                }
                <AddButton onClick={handleClickAdd}/>
            </div>
        </div>
    )
}