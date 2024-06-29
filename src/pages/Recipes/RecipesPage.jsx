import PageHeader from "../../components/PageHeader/PageHeader"
import LinkNavBack from "../../components/Links/LinkNavBack"
import MenuRecipes from "./MenuRecipes"
import ListRecipesEl from "./ListRecipesEl"
import AddNewRecipeEl from "./AddNewRecipeEl"
import { useContext } from "react"
import { FormContext } from "../../Context/FormContextComponent"

export default function RecipesPage() {
    const {formData, handleChange, clearFormData, openForm} = useContext(FormContext) 
    
    return (
        <>
            <PageHeader>
                <LinkNavBack className="col-span-2"/>
                <PageHeader.Title className="col-start-3 col-span-5">Recipes</PageHeader.Title>
                <MenuRecipes />
            </PageHeader>
            <main className="mt-12 px-4 flex flex-col gap-4">
                <ListRecipesEl />
                {
                    formData &&
                    <AddNewRecipeEl />
                }
            </main>
        </>
    )
}