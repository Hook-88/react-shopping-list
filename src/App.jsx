import { BrowserRouter, Routes, Route } from "react-router-dom"
import ShoppingListPage from "./pages/ShoppingList/ShoppingListPage"
import RecipesPage from "./pages/Recipes/RecipesPage"
import RecipePage from "./pages/Recipe/RecipePage"
import RecipeEditPage from "./pages/RecipeEdit/RecipeEditPage"
import RecipeNameEditPage from "./pages/RecipeNameEdit/RecipeNameEditPage"
import IngredientEditPage from "./pages/IngredientEdit/IngredientEditpage"

export default function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ShoppingListPage />}/>
                <Route path="/recipes" element={<RecipesPage />}/>
                <Route path="/recipes/:recipeId/:recipeName" element={<RecipePage />}/>
                <Route path="/recipes/:recipeId/:recipeName/edit" element={<RecipeEditPage />}/>
                <Route path="/recipes/:recipeId/:recipeName/edit/name" element={<RecipeNameEditPage />}/>
                <Route path="/recipes/:recipeId/:recipeName/edit/ingredient/:ingredientId" element={<IngredientEditPage />}/>
            </Routes>
        </BrowserRouter>
    )
  }