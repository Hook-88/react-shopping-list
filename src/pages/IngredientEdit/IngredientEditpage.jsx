import { useParams } from "react-router-dom"
import PageHeader from "../../components/PageHeader/PageHeader"
import useRecipeNameSnapshot from "../../hooks/useRecipeNameSnapshot"
import getStringFirstCharCap from "../../utility/getStringFirstCharCap"
import PageMain from "../../components/PageMain/PageMain"
import { useAtom } from "jotai"
import { pageFormsOpenAtom } from "../../store/store"
import NavLinkBack from "../../components/Links/NavLinkBack"
import useIngredientSnapshot from "../../hooks/useIngredientSnapshot"

export default function IngredientEditPage() {
    const params = useParams()
    const ingredient = useIngredientSnapshot(params.recipeId, params.ingredientId)
    
    return (
        <>
            <PageHeader>
                <NavLinkBack to="./../.."/>
                <PageHeader.Title>
                    {ingredient?.name ? `${getStringFirstCharCap(ingredient.name)} (edit)` : "Loading..."}
                </PageHeader.Title>
            </PageHeader>
        </>
    )
}