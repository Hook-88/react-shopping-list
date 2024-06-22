import { useEffect, useState } from "react"
import IconAdd from "../../components/Icons/IconAdd"
import List from "../../components/List/List"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../../firebase/firebase"
import LinkNav from "../../components/LinkNav"
import getCapString from "../../utility/getCapString"
import { Link } from "react-router-dom"
import { FaAngleLeft } from "react-icons/fa6"
import AddItem from "../../components/AddItem"
import { useStore } from "../../store/store"


export default function RecipesPage() {
    const [recipes, setRecipes] = useState([])
    const setFormOpen = useStore(state => state.updateFormData)
    const formData = useStore(state => state.formData)


    function handleClickAddButton() {
        setFormOpen(true)
    }

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
        <>
        <header className="py-2 px-4 grid grid-cols-9 font-bold text-lg fixed inset-x-0 top-0 bg-black/80">
            <Link className="col-span-2 flex gap-1 items-center font-light text-blue-500" to="./..">
                <FaAngleLeft />Back
            </Link>
            <h1 className="col-start-3 col-span-5 text-center">Recipes</h1>
            <button 
                className="col-start-9 flex justify-end items-center"
                onClick={handleClickAddButton}
            >
                <IconAdd className="mr-5"/>
            </button>
        </header>

        <main className="px-4 mt-12 flex flex-col gap-4 pb-5">
            <List>
                {
                    recipes.map(recipe => (
                        <li key={recipe.id}>
                            <LinkNav to={recipe.id}>{getCapString(recipe.name)}</LinkNav>
                        </li>
                    ))
                }
            </List>
            {
                formData && <AddItem />
            }
        </main>
        </>
    )

    // TODO add logic to add new recipes
    

}