import PageHeader from "../../components/PageHeader/PageHeader"
import { useLocation, useParams } from "react-router-dom"
import PageMain from "../../components/PageMain/PageMain"
import getStringFirstCharCap from "../../utility/getStringFirstCharCap"
import Menu from "../../components/Menu/Menu"
import { FaEllipsis } from "react-icons/fa6"
import RecipeNameEl from "./RecipeNameEl"
import RecipeIngredientsEl from "./RecipeIngredientsEl"
import { useAtom } from "jotai"
import { pageFormsOpenAtom } from "../../store/store"
import AddIngredientEl from "./AddIngredientEl"
import useIngredientsValue from "../../hooks/useIngredientsValue"

export default function RecipeEditPage() {
    const { recipeName, recipeId } = useParams()
    const ingredients = useIngredientsValue(recipeId)
    const [openForm, setOpenForm] = useAtom(pageFormsOpenAtom)

    function handleClickAdd() {
        setOpenForm(true)
    }
    
    return (
        <>
            <PageHeader>
                <PageHeader.Title>Edit {getStringFirstCharCap(recipeName)}</PageHeader.Title>
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
                            Add ingredient
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </PageHeader>
            <PageMain>

                <RecipeNameEl />
                {
                    ingredients && (
                        <RecipeIngredientsEl 
                            ingredients={ingredients} 
                        />
                    )
                }
                

                {
                    openForm && (
                        <AddIngredientEl />
                    )
                }

                

            </PageMain>



        </>
    )
}