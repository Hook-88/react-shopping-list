import { useEffect, useState } from "react"
import PageHeader from "../../components/PageHeader/PageHeader"
import PageMain from "../../components/PageMain/PageMain"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../../firebase"
import NavLinkTo from "../../components/Links/NavLinkTo"
import getStringFirstCharCap from "../../utility/getStringFirstCharCap"
import Menu from "../../components/Menu/Menu"
import { FaEllipsis } from "react-icons/fa6"

export default function RecipesPage() {
    const [recipes, setRecipes] = useState(null)

    useEffect(() => {
        const collectionRef = collection(db, "recipes")
        const unsub = onSnapshot(collectionRef, collectionSnapshot => {
            const arr = collectionSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id}))

            setRecipes(arr)
        })

        return unsub
    }, [])
    
    return (
        <>
            <PageHeader>
                <PageHeader.Title>Recipes</PageHeader.Title>
                <Menu className="flex items-center">
                    <Menu.Button className="w-full h-full flex items-center justify-end">
                        <span className="p-1 border border-transparent">
                            <FaEllipsis />
                        </span>
                    </Menu.Button>
                    
                    <Menu.Dropdown>
                        <Menu.Item 
                            className="px-4 py-1 border-b border-white/10 text-nowrap"
                            // onClick={handleClickAdd}
                        >
                            Add Recipe
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </PageHeader>
                <PageMain>
                {
                    recipes && (
                        <ul>
                            {
                                recipes.map(recipe => (
                                    <li key={recipe.id}>
                                        <NavLinkTo to={recipe.id}>
                                            {getStringFirstCharCap(recipe.name)}
                                        </NavLinkTo>
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }
                <div className="bg-white/10 p-2 rounded-md">
                    <form className="grid gap-2" 
                        // onSubmit={handleSubmit(sendFormData)}
                    >
                        <input 
                            type="text" 
                            className="py-1 px-2 rounded-md bg-white/10"
                            placeholder="Item..."
                            // {...register("itemName")}
                            required
                            autoFocus
                        />
                        <div className="flex gap-2">
                            <button 
                                className="flex-grow py-1 bg-green-900 rounded-md border border-white/10"
                            >
                                Add
                            </button>
                            <button 
                                className="px-2 bg-red-900 rounded-md border border-white/10" 
                                type="button"
                                // onClick={closeForm}
                            >
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </PageMain>
        </>
    )
}