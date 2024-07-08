import { useEffect, useState } from "react"
import PageHeader from "../../components/PageHeader/PageHeader"
import PageMain from "../../components/PageMain/PageMain"
import { collection, getDocs, onSnapshot } from "firebase/firestore"
import { db } from "../../firebase"
import NavLinkTo from "../../components/Links/NavLinkTo"
import getStringFirstCharCap from "../../utility/getStringFirstCharCap"
import Menu from "../../components/Menu/Menu"
import { FaEllipsis } from "react-icons/fa6"
import { useAtom } from "jotai"
import { pageFormsOpenAtom } from "../../store/store"
import { useParams } from "react-router-dom"
import useIngredientsValue from "../../hooks/useIngredientsValue"

export default function RecipePage() {
    const params = useParams()
    const ingredients = useIngredientsValue(params.recipeId)
    const [localIngredients, setLocalIngredients] = useState(null)

    useEffect(() => {
        setLocalIngredients(ingredients?.map(ingredient => ({ ...ingredient, selected: false})))
    }, [ingredients])

    console.log(localIngredients)
    
    return (
        <>
            <PageHeader>
                <PageHeader.Title>{getStringFirstCharCap(params.recipeName)}</PageHeader.Title>
                {/* <Menu className="flex items-center">
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
                </Menu> */}
            </PageHeader>
                <PageMain>
                {
                    localIngredients && (
                        <ul>
                            {
                                localIngredients.map(ingredient => (
                                    <li key={ingredient.id}>
                                        <div 
                                            className="py-2 px-4 border border-transparent mb-3 rounded-md bg-white/10 flex items-center gap-1"
                                        >
                                            <p>{getStringFirstCharCap(ingredient.name)}</p>

                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }

            </PageMain>
        </>
    )
}

{/* <div 
    className="py-2 px-4 border border-transparent mb-3 rounded-md bg-white/10 flex items-center gap-1"
>
    <p>{getStringFirstCharCap(item.name)}</p>

</div> */}