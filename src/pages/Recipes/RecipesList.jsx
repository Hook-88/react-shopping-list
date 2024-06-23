import { useEffect, useState } from "react"
import List from "../../components/List/List"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../../firebase/firebase"
import LinkNav from "../../components/Links/LinkNav"
import getCapString from "../../utility/getCapString"


export default function RecipesList() {
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "recipes"), snapshot => {
            const arr = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))

            setRecipes(arr)
        })

        return unsub
    },[])
    
    return (
        <List>
            {
                recipes.map(recipe => (
                    <li key={recipe.id}>
                        <LinkNav to={recipe.id}>{getCapString(recipe.name)}</LinkNav>
                    </li>
                ))
            }
        </List>
    )
    

}