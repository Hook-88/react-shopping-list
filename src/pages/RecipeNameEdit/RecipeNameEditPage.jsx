import { useParams } from "react-router-dom"
import PageHeader from "../../components/PageHeader/PageHeader"
import useRecipeNameSnapshot from "../../hooks/useRecipeNameSnapshot"
import getStringFirstCharCap from "../../utility/getStringFirstCharCap"
import PageMain from "../../components/PageMain/PageMain"
import EditRecipeNameEl from "./EditRecipeNameEl"

export default function RecipeNameEditPage() {
    const params = useParams()
    const recipeName = useRecipeNameSnapshot(params.recipeId)
    
    return (
        <>
            <PageHeader>
                <PageHeader.Title>
                    {recipeName?.name ? `${getStringFirstCharCap(recipeName.name)} (edit)` : "Loading..."}
                </PageHeader.Title>
            </PageHeader>

            {
                recipeName && (
                    <PageMain>
                            <div 
                                className="py-2 px-4 border border-transparent rounded-md bg-white/10 flex items-center gap-1"
                            >
                                <p>{getStringFirstCharCap(recipeName.name)}</p>

                            </div>
                            <EditRecipeNameEl nameValue={recipeName.name}/>

                    </PageMain>
                )
            }
        </>
    )
}