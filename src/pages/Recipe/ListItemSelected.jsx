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
import ListItemDefault from "./ListItemDefault"

export default function ListItemSelected({children, onClick}) {
    const params = useParams()
    // const ingredients = useIngredientsValue(params.recipeId)
    // const [localIngredients, setLocalIngredients] = useState(null)

    // useEffect(() => {
    //     setLocalIngredients(ingredients?.map(ingredient => ({ ...ingredient, selected: false})))
    // }, [ingredients])

    // function toggleSelectIngredient(id) {
    //     setLocalIngredients(prevIngredients => prevIngredients.map(ingredient => ingredient.id === id ? {...ingredient, selected: !ingredient.selected} : ingredient))
    // }
    
    return (
        <li 
            onClick={onClick}
            className="mb-2.5 border border-green-900 rounded-md"
        >
            <div 
                className="py-2 px-4 border border-green-900 rounded-md bg-green-300/10 flex items-center justify-between gap-1"
            >
                <p>{getStringFirstCharCap(children)}</p>

                    <FaCheck />
            </div>
        </li>
    )
}

{/* <div 
    className="py-2 px-4 border border-transparent mb-3 rounded-md bg-white/10 flex items-center gap-1"
>
    <p>{getStringFirstCharCap(item.name)}</p>

</div> */}