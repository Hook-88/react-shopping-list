import { useParams } from "react-router-dom"
import PageHeader from "../../components/PageHeader/PageHeader"
import useRecipeNameSnapshot from "../../hooks/useRecipeNameSnapshot"
import getStringFirstCharCap from "../../utility/getStringFirstCharCap"
import PageMain from "../../components/PageMain/PageMain"
import EditRecipeNameEl from "./EditRecipeNameEl"
import { useAtom } from "jotai"
import { pageFormsOpenAtom } from "../../store/store"
import NavLinkBack from "../../components/Links/NavLinkBack"

export default function RecipeNameEditPage() {
    const params = useParams()
    const recipeName = useRecipeNameSnapshot(params.recipeId)
    const [formOn, setFormOn] = useAtom(pageFormsOpenAtom)

    function toggleFormOn() {
        setFormOn(prev => !prev)
    }
    
    return (
        <>
            <PageHeader>
                <NavLinkBack />
                <PageHeader.Title>
                    {recipeName?.name ? `${getStringFirstCharCap(recipeName.name)} (edit)` : "Loading..."}
                </PageHeader.Title>
            </PageHeader>

            {
                recipeName && (
                    <PageMain>
                        <EditRecipeNameEl nameValue={recipeName.name}/>
                    </PageMain>
                )
            }
        </>
    )
}