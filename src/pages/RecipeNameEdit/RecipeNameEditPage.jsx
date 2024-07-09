import { useParams } from "react-router-dom"
import PageHeader from "../../components/PageHeader/PageHeader"
import useRecipeNameSnapshot from "../../hooks/useRecipeNameSnapshot"
import PageMain from "../../components/PageMain/PageMain"
import EditRecipeNameEl from "./EditRecipeNameEl"
import NavLinkBack from "../../components/Links/NavLinkBack"
import { useAtom } from "jotai"
import { pageFormsOpenAtom } from "../../store/store"
import RecipeNameCard from "./RecipeNameCard"

export default function RecipeNameEditPage() {
    const params = useParams()
    const recipeName = useRecipeNameSnapshot(params.recipeId)
    const [formOn, setFormOn] = useAtom(pageFormsOpenAtom)
    
    return (
        <>
            <PageHeader>
                <NavLinkBack />
                <PageHeader.Title>
                    Recipe name
                </PageHeader.Title>
            </PageHeader>

            {
                recipeName && (
                    <PageMain>
                        
                        {
                            formOn ? <EditRecipeNameEl nameValue={recipeName.name} onCancel={() => setFormOn(false)}/> : (
                                <RecipeNameCard isFavorite={recipeName?.isFavorite}>
                                    {recipeName.name}
                                </RecipeNameCard>
                            )
                        }
                        
                    </PageMain>
                )
            }
        </>
    )
}