import { useEffect, useState } from "react"
import PageHeader from "../../components/PageHeader/PageHeader"
import PageMain from "../../components/PageMain/PageMain"
import { collection, getDocs, onSnapshot } from "firebase/firestore"
import { db } from "../../firebase"
import NavLinkTo from "../../components/Links/NavLinkTo"
import getStringFirstCharCap from "../../utility/getStringFirstCharCap"
import Menu from "../../components/Menu/Menu"
import { FaCheck, FaEllipsis } from "react-icons/fa6"
import { useAtom } from "jotai"
import { pageFormsOpenAtom } from "../../store/store"
import { useParams } from "react-router-dom"
import useIngredientsValue from "../../hooks/useIngredientsValue"
import ListIngredientsEl from "./ListIngredientsEl"
import addItemToFirebase from "../../utility/firestoreFn/addFirebaseItem"

export default function RecipePage() {
    const params = useParams()
    const ingredients = useIngredientsValue(params.recipeId)
    const [localIngredients, setLocalIngredients] = useState(null)

    useEffect(() => {
        setLocalIngredients(ingredients?.map(ingredient => ({ ...ingredient, selected: false})))
    }, [ingredients])

    function toggleSelectIngredient(id) {
        setLocalIngredients(prevIngredients => prevIngredients.map(ingredient => ingredient.id === id ? {...ingredient, selected: !ingredient.selected} : ingredient))
    }

    function selectAllIngredients(valueSelected) {
        setLocalIngredients(prevIngredients => prevIngredients.map(ingredient => ({...ingredient, selected: valueSelected}) ))
    }

    function handleClickAdd() {
        localIngredients.filter(ingredient => ingredient.selected === true)
            .forEach(filteredIngr => addItemToFirebase(filteredIngr.name))
    }
    
    return (
        <>
            <PageHeader>
                <PageHeader.Title>{getStringFirstCharCap(params.recipeName)}</PageHeader.Title>
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
                            Edit Recipe
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </PageHeader>
                <PageMain>
                { localIngredients && (
                    <>
                        <ListIngredientsEl 
                            localIngredients={localIngredients}
                            toggleSelect={toggleSelectIngredient}
                            selectAllIngredients={selectAllIngredients}

                        />
                        
                        <div className="bg-white/10 p-2 rounded-md flex">

                                    <button 
                                        className="flex-grow py-1 bg-green-900 rounded-md border border-white/10 disabled:bg-green-900/30 disabled:text-white/30"
                                        disabled={localIngredients?.every(ingredient => ingredient.selected === false)}
                                        onClick={handleClickAdd}
                                    >
                                        Add to shopping list
                                    </button>

                        </div>
                    </>
                ) 
                }

            </PageMain>
        </>
    )
}
