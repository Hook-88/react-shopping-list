import PageHeader from "../../components/PageHeader/PageHeader"
import LinkNavBack from "../../components/Links/LinkNavBack"
import { useContext } from "react"
import { useParams } from "react-router-dom"
import List from "../../components/List/List"
import getCapString from "../../utility/getCapString"
import Card from "../../components/Card"
import { RecipeContext } from "./RecipeState"

export default function RecipePage() {
    const { recipeId } = useParams()
    const {recipeObj, updateRecipeObj, clearRecipeObj, setRecipeObj} = useContext(RecipeContext)
    
    updateRecipeObj(recipeId)
    
    function handleClickBack() {
        clearRecipeObj()
    }

    function toggleSelect(ingredientId) {
        setRecipeObj(prevRecipeObj => ({
            ...prevRecipeObj,
            ingredients: prevRecipeObj.ingredients.map(ingredient => (
                ingredient.id === ingredientId ? {...ingredient, selected: !ingredient.selected} : ingredient
            ))
        }))
    }

    function setIngredientsSelect(selectValue) {
        setRecipeObj(prevRecipeObj => ({
            ...prevRecipeObj,
            ingredients: prevRecipeObj.ingredients.map(ingredient => 
                ({
                    ...ingredient, 
                    selected: selectValue
                })
            )
        }))
    }
    
    return (
        <>
            <PageHeader>
                <LinkNavBack className="col-span-2" onClick={handleClickBack}/>
                <PageHeader.Title className="col-start-3 col-span-5">{recipeObj?.name ? recipeObj.name: "Loading..."}</PageHeader.Title>
            </PageHeader>
            {
                recipeObj?.ingredients &&
                <main className="mt-12 px-4 flex flex-col gap-4">
                    <List listArr={recipeObj.ingredients}>
                        <List.Header className="flex items-center justify-between mb-0.5">
                            <List.Progress />
                            <button 
                                className="flex items-center pr-1.5 disabled:text-white/50"
                                onClick={() => setIngredientsSelect(recipeObj?.ingredients.some(ingredient => ingredient.selected === false))}
                            >
                                {
                                    recipeObj?.ingredients.some(ingredient => ingredient.selected === false) ? 
                                    <small className="flex items-center">
                                        Select all
                                    </small> :
                                    <small className="flex items-center">
                                        Deselect all
                                    </small>
                                }        
                            </button>
                        </List.Header>

                        <List.List>
                            {
                                ingredients => ingredients.map(ingredient => (
                                    ingredient.selected ?
                                    <li 
                                        key={ingredient.id} 
                                        onClick={() => toggleSelect(ingredient.id)}
                                    >
                                        <Card className="font-bold border-2 border-green-900">
                                            {
                                                getCapString(ingredient.name)
                                            }
                                        </Card>
                                    </li> :

                                    <li 
                                        key={ingredient.id} 
                                        className="border border-transparent"
                                        onClick={() => toggleSelect(ingredient.id)}
                                    >
                                        <Card>
                                            {
                                                getCapString(ingredient.name)
                                            }
                                        </Card>
                                    </li>
                                ))
                            }
                        </List.List>

                    </List>
                </main>
            }
        </>
    )
}