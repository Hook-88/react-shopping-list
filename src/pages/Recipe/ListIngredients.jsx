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
import ListItemSelected from "./ListItemSelected"

export default function ListIngredients({localIngredients, toggleSelect}) {
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
        <ul>
            {
                localIngredients.map(ingredient => ( ingredient.selected ? 
                    <ListItemSelected
                        key={ingredient.id} 
                        onClick={() => toggleSelect(ingredient.id)}
                    >
                        {ingredient.name}
                    </ListItemSelected> :

                    <ListItemDefault
                        key={ingredient.id} 
                        onClick={() => toggleSelect(ingredient.id)}
                    >
                        {ingredient.name}
                    </ListItemDefault>
                ))
            }
        </ul>
    )
}

{/* <div 
    className="py-2 px-4 border border-transparent mb-3 rounded-md bg-white/10 flex items-center gap-1"
>
    <p>{getStringFirstCharCap(item.name)}</p>

</div> */}