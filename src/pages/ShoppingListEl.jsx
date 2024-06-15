import { shoppingListAtom } from "../atom"
import List from "../components/List/List"
import { useAtomValue } from "jotai"
import SubtractButton from "../components/Buttons/SubtractButton"
import AddButton from "../components/Buttons/AddButton"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase/firebase"
import { FaCheck } from "react-icons/fa6"

export default function ShoppingListEl() {
    const shoppingList = useAtomValue(shoppingListAtom)
    const docRef = doc(db, "shoppingList", "DhAnx7FUB4kZNnEgPRWS")

    async function toggleSelect(itemId) {
        const newArray = shoppingList.items.map(item => item.id === itemId ? {...item, selected: !item.selected} : item)

        updateDoc(docRef, {items: newArray})
    }

    async function modifyQuantity(itemId, num) {
        const newArray = shoppingList.items.map(item => item.id === itemId ? {...item, quantity: item.quantity + num} : item)

        updateDoc(docRef, {items: newArray})
    }

    return (
        <List>
            {
                shoppingList?.items && shoppingList.items.map(item => (
                    <List.Item 
                        key={item.id}
                        onClick={() => toggleSelect(item.id)}
                        itemObj={item}
                    >
                        <p className="border border-white/0">
                        {item.name}
                        &nbsp;
                        { item.quantity > 1 && `(${item.quantity}x)` }
                        </p>

                        {
                            !item.selected ?
                            <div className="flex gap-2 ml-auto">
                                {
                                    item.quantity > 1 &&
                                    <SubtractButton 
                                        onClick={e => {
                                            e.stopPropagation()
                                            modifyQuantity(item.id, -1)
                                        }}
                                    />
                                }
                                <AddButton 
                                    onClick={e => {
                                        e.stopPropagation()
                                        modifyQuantity(item.id, 1)
                                    }}
                                />       
                            </div> :
                            <span className="ml-auto flex items-center justify-center p-1">
                                <FaCheck />
                            </span>
                        }

                    </List.Item>
                ))
            }
        </List>
    )
}