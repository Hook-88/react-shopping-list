import { useContext, useEffect, useState } from "react"
import List from "../../components/List/List"
import { ShoppingListContext } from "./../ShoppingList/ShoppingListContextComponent"
// import ListShoppingListDefault from "./ListShoppingListDefault"
// import ListShoppingListFilter from "./ListShoppingListFilter"
import { FilterContext } from "../../Context/FilterContextComponent"
import { FaEye, FaEyeSlash } from "react-icons/fa6"
import { DialogConfirmContext } from "../../components/DialogConfirm/DialogConfirm"
import Card from "../../components/Card"
import getCapString from "../../utility/getCapString"
import LinkNav from "../../components/Links/LinkNav"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../../firebase/firebase"


export default function ListRecipesEl() {
    const [recipes, setRecipe] = useState(null)
    const { setDialogObj } = useContext(DialogConfirmContext)

    useEffect(() => {
        const collectionRef = collection(db, "recipes")
        const unsub = onSnapshot(collectionRef, collectionSnapshot => {
            const arr = collectionSnapshot.docs.map(doc => ({...doc.data(), id: doc.id}))

            setRecipe(arr)
        })

        return unsub
    }, [])
    
    return (
        recipes?.length > 0 ?
        <List listArr={recipes}>
            <List.List>
                {
                    arr => arr.map(item => (
                        <li 
                            key={item.id}
                        >
                            <LinkNav to={item.id}>
                                { getCapString(item.name) }
                            </LinkNav>
                        </li>
                    ))
                }
            </List.List>
        </List> : null
    )
}