import PageHeader from "../../components/PageHeader/PageHeader"
import LinkNavBack from "../../components/Links/LinkNavBack"
import { useContext } from "react"
import { RecipeContext } from "../Recipe/RecipeState"
import RecipeEditMenu from "./RecipeEditMenu"
import getCapString from "../../utility/getCapString"

export default function RecipeEditPageHeader() {
    const { recipeObj } = useContext(RecipeContext)
    
    return (
        <PageHeader>
            <LinkNavBack 
                className="col-span-2" 
            />
            <PageHeader.Title className="col-start-3 col-span-5">
                {recipeObj?.name ? `Edit ${getCapString(recipeObj.name)}`: "Loading..."}
            </PageHeader.Title>

            <RecipeEditMenu />
        </PageHeader>
    )
}