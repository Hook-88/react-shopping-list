import { useEffect, useState } from "react"
import PageHeader from "../../components/PageHeader/PageHeader"
import PageMain from "../../components/PageMain/PageMain"
import getStringFirstCharCap from "../../utility/getStringFirstCharCap"
import Menu from "../../components/Menu/Menu"
import { FaEllipsis } from "react-icons/fa6"
import { useAtom } from "jotai"
import { confirmDialogAtom } from "../../store/store"
import { useNavigate, useParams, Link } from "react-router-dom"
import useIngredientsValue from "../../hooks/useIngredientsValue"
import ListIngredientsEl from "./ListIngredientsEl"
import addItemToFirebase from "../../utility/firestoreFn/addFirebaseItem"
import NavLinkBack from "../../components/Links/NavLinkBack"
import ConfirmDialog from "../../components/ConfirmDialog.jsx/ConfirmDialog"
import AddToShoppingListBtnEl from "./AddToShoppingListBtnEl"

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

    function addSelectionToShoppingList() {
        localIngredients.filter(ingredient => ingredient.selected === true)
            .forEach(filteredIngr => addItemToFirebase(filteredIngr.name))
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
    
    return (
        <>
            <PageHeader>
                <NavLinkBack to="./../.."/>
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
                            <Link state={ingredients} to="edit">
                                Edit Recipe
                            </Link>
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
                        <AddToShoppingListBtnEl 
                            onClick={handleClickAdd}
                            valueDisabled={localIngredients?.every(ingredient => ingredient.selected === false)}
                        />
                    </>
                ) 
                }

            </PageMain>
            {
                confirmObj && <ConfirmDialog />
            }
        </>
    )
}
