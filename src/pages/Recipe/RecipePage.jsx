import { createContext, useEffect, useState } from "react"
import PageHeader from "../../components/PageHeader/PageHeader"
import PageMain from "../../components/PageMain/PageMain"
import getStringFirstCharCap from "../../utility/getStringFirstCharCap"
import { useAtom } from "jotai"
import { confirmDialogAtom } from "../../store/store"
import { useNavigate, useParams } from "react-router-dom"
import useIngredientsValue from "../../hooks/useIngredientsValue"
import ListIngredientsEl from "./ListIngredientsEl"
import addItemToFirebase from "../../utility/firestoreFn/addFirebaseItem"
import NavLinkBack from "../../components/Links/NavLinkBack"
import ConfirmDialog from "../../components/ConfirmDialog.jsx/ConfirmDialog"
import AddToShoppingListBtnEl from "./AddToShoppingListBtnEl"
import MenuRecipePage from "./MenuRecipePage"

const RecipeContext = createContext()

export default function RecipePage() {
    const params = useParams()
    const ingredients = useIngredientsValue(params.recipeId)
    const [localIngredients, setLocalIngredients] = useState(null)
    const [confirmObj, setConfirmObj] = useAtom(confirmDialogAtom)
    const navigate = useNavigate()

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
        setConfirmObj({
            question: "Add selection to shopping list?",
            onConfirm: () => handleOnConfirm()
        })
        selectAllIngredients(false)
    }

    
    function handleOnConfirm() {
        addSelectionToShoppingList()
        
        setTimeout(() => {
            setConfirmObj({
                question: "Go to the shopping list?",
                onConfirm: () => navigate("/")
            })
        }, 110)
        
    }
    
    function addSelectionToShoppingList() {
        localIngredients.filter(ingredient => ingredient.selected === true)
            .forEach(filteredIngr => addItemToFirebase(filteredIngr.name))
    }
    return (
        <RecipeContext.Provider 
            value={
                {
                    localIngredients,
                    toggleSelectIngredient,
                    selectAllIngredients
                }
            }
        >
            <PageHeader>
                <NavLinkBack to="./../.."/>
                <PageHeader.Title>{getStringFirstCharCap(params.recipeName)}</PageHeader.Title>
                <MenuRecipePage />
            </PageHeader>

            <PageMain>
                { 
                    localIngredients && (
                        <>
                            <ListIngredientsEl />
                            <AddToShoppingListBtnEl 
                                onClick={handleClickAdd}
                                valueDisabled={localIngredients?.every(ingredient => ingredient.selected === false)}
                            />
                        </>
                    ) 
                }

            </PageMain>

            { confirmObj && <ConfirmDialog /> }

        </RecipeContext.Provider>
    )
}

export { RecipeContext }