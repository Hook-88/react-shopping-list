import { useEffect, useState } from "react"
import PageHeader from "../../components/PageHeader/PageHeader"
import PageMain from "../../components/PageMain/PageMain"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../../firebase"
import NavLinkTo from "../../components/Links/NavLinkTo"
import getStringFirstCharCap from "../../utility/getStringFirstCharCap"
import Menu from "../../components/Menu/Menu"
import { FaAngleLeft, FaEllipsis } from "react-icons/fa6"
import { useAtom } from "jotai"
import { pageFormsOpenAtom } from "../../store/store"
import AddRecipeEl from "./AddRecipeEl"
import NavLinkBack from "../../components/Links/NavLinkBack"

export default function RecipesPage() {
    const [recipes, setRecipes] = useState(null)
    const [openForm, setOpenForm] = useAtom(pageFormsOpenAtom)

    useEffect(() => {
        const collectionRef = collection(db, "recipes")
        const unsub = onSnapshot(collectionRef, collectionSnapshot => {
            const arr = collectionSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id}))

            setRecipes(arr)
        })

        return unsub
    }, [])

    function handleClickAdd() {
        setOpenForm(true)
    }
    
    return (
        <>
            <PageHeader>
                <NavLinkBack />
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
                            onClick={handleClickAdd}
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
                                        <NavLinkTo to={`${recipe.id}/${recipe.name}`}>
                                            {getStringFirstCharCap(recipe.name)}
                                        </NavLinkTo>
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }

                { openForm && <AddRecipeEl /> }
            </PageMain>
        </>
    )
}