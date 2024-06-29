import { createContext, useState, useEffect } from "react"
import { db } from "../../firebase/firebase"
import { onSnapshot, doc, collection } from "firebase/firestore"


const RecipeContext = createContext()

export default function RecipeState({children}) {
    const [recipeObj, setRecipeObj] = useState(null)

    function clearRecipeObj() {
        setRecipeObj(null)
    }

    function updateRecipeObj(recipeId) {
        getFirebaseRecipeNameAndId(recipeId)
        getFirebaseRecipeIngredients(recipeId)
    }

    function getFirebaseRecipeNameAndId(recipeId) {

        useEffect(() => {
            const docRef = doc(db, "recipes", recipeId)
            const unsub = onSnapshot(docRef, docSnapshot => {
                const obj = {
                    name: docSnapshot.data().name,
                    id: docSnapshot.id
                }
    
                setRecipeObj(prevRecipeObj => (
                    { 
                        ...prevRecipeObj, 
                        name: obj.name, 
                        id: obj.id,
                    }
                ))
            })
    
            return unsub
        }, [])
    }

    function getFirebaseRecipeIngredients(recipeId) {
        
        useEffect(() => {
            const collectionRef = collection(db, `recipes/${recipeId}/ingredients`)
            const unsub = onSnapshot(collectionRef, collectionSnapshot => {
                const arr = collectionSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, selected: false}))
    
                setRecipeObj(prevRecipeObj => ({ ...prevRecipeObj, ingredients: arr}))
            })
    
            return unsub
        },[])
    }


    
    return (
        <RecipeContext.Provider value={{recipeObj, updateRecipeObj, clearRecipeObj, setRecipeObj}}>
            {children}
        </RecipeContext.Provider>
    )
}

export { RecipeContext }