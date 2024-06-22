import { useStore } from "../../store/store"
import ShowAddRecipeFormButton from "./ShowAddRecipeFormButton"
import AddRecipeToFirebase from "./AddRecipeToFirebase"
import LinkNavBack from "../../components/Links/LinkNavBack"
import PageHeader from "../../components/PageHeader/PageHeader"
import RecipesList from "./RecipesList"


export default function RecipesPage() {
    const formData = useStore(state => state.formData)

    return (
        <>
        <PageHeader>
            <LinkNavBack className="col-span-2" />
            <PageHeader.Title className="col-start-3 col-span-5">Recipes</PageHeader.Title>
            <ShowAddRecipeFormButton />
        </PageHeader>

        <main className="px-4 mt-12 flex flex-col gap-4 pb-5">
            <RecipesList />
            { formData && <AddRecipeToFirebase /> }
        </main>
        </>
    )
    

}