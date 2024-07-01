import PageHeader from "../../components/PageHeader/PageHeader"
import LinkNavBack from "../../components/Links/LinkNavBack"
import { useContext } from "react"
import { RecipeContext } from "../Recipe/RecipeState"
import Card from "../../components/Card"
import List from "../../components/List/List"

export default function RecipeEditPage() {
    const {
        recipeObj, 
        updateRecipeObj, 
        clearRecipeObj, 
        setIngredientsSelect
    
    } = useContext(RecipeContext)
    
    return (
        <>
        <PageHeader>
            <LinkNavBack 
                className="col-span-2" 
            />
            <PageHeader.Title className="col-start-3 col-span-5">
                {recipeObj?.name ? `Edit ${recipeObj.name}`: "Loading..."}
            </PageHeader.Title>
        </PageHeader>
        {
            recipeObj?.ingredients &&
            <main className="mt-12 px-4 flex flex-col gap-4">
                <div>
                    <small className="ml-4">Recipe name</small>
                    <Card>
                        {recipeObj.name}
                    </Card>
                </div>

                <List>
                    <List.Header>
                        <small>Ingredients</small>
                    </List.Header>
                    

                </List>

            </main>
        }
        {/* {
            dialogObj && <DialogConfirmEl />
        } */}
    </>
    )
}