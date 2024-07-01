import PageHeader from "../../components/PageHeader/PageHeader"
import LinkNavBack from "../../components/Links/LinkNavBack"
import { useContext } from "react"
import { RecipeContext } from "../Recipe/RecipeState"
import Card from "../../components/Card"
import List from "../../components/List/List"
import { useParams } from "react-router-dom"
import getCapString from "../../utility/getCapString"
import Menu from "../../components/Menu/Menu"
import IconMore from "../../components/Icons/IconMore"

export default function RecipeEditPage() {
    const {recipeId} = useParams()
    const {
        recipeObj, 
        updateRecipeObj, 
        clearRecipeObj, 
        setIngredientsSelect
    
    } = useContext(RecipeContext)

    updateRecipeObj(recipeId)
    
    return (
        <>
        <PageHeader>
            <LinkNavBack 
                className="col-span-2" 
            />
            <PageHeader.Title className="col-start-3 col-span-5">
                {recipeObj?.name ? `Edit ${recipeObj.name}`: "Loading..."}
            </PageHeader.Title>

            <Menu className="col-span-2">
                <Menu.Button className="flex items-center justify-end pr-4">
                    <IconMore className="px-1"/>
                </Menu.Button>
                <Menu.Dropdown>
                    <Menu.Item>
                        Add ingredient
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
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

                <List listArr={recipeObj.ingredients}>
                    <List.Header>
                        <small>Ingredients</small>
                    </List.Header>
                    <List.List>
                        {
                            ingredients => ingredients.map(ingredient => (
                                <li key={ingredient.id}>
                                    <Card>
                                        {getCapString(ingredient.name)}
                                    </Card>
                                </li>
                            ))
                        }
                    </List.List>


                </List>

            </main>
        }
        {/* {
            dialogObj && <DialogConfirmEl />
        } */}
    </>
    )
}