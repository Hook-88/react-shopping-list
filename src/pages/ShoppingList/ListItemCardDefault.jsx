import Card from "../../components/Card"
import getCapString from "../../utility/getCapString"
import ButtonAdd from "../../components/Buttons/ButtonAdd"
import ButtonSubtract from "../../components/Buttons/ButtonSubtract"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase/firebase"

export default function ListItemCardDefault({item}) {

    function handleClickAdd(event) {
        event.stopPropagation()
        modifyQuantityInFirebase(1)
    }

    function handleClickSubtract(event) {
        event.stopPropagation()
        modifyQuantityInFirebase(-1)
    }
    
    async function modifyQuantityInFirebase(num) {
        const docRef = doc(db, "shoppingList", item.id)
        const docSnap = await getDoc(docRef)

        await updateDoc(docRef, { quantity: docSnap.data().quantity + num})
    }
    
    return (
        <Card className="flex justify-between items-center">
            { getCapString(item.name) }
            &nbsp;
            { item.quantity > 1 && `(${item.quantity}x)` }
            <div className="flex gap-2">
                { item.quantity > 1 && <ButtonSubtract onClick={handleClickSubtract}/> }
                <ButtonAdd onClick={handleClickAdd}/>
            </div>
        </Card>
    )
}