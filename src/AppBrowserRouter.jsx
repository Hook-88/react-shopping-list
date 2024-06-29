import { BrowserRouter, Route, Routes } from "react-router-dom"
import ShoppingListPage from "./pages/ShoppingList/ShoppingListPage"
import RecipesPage from "./pages/Recipes/RecipesPage"
import RecipePage from "./pages/Recipe/RecipePage"

export default function AppBrowserRouter() {    

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ShoppingListPage />}/>
                <Route path="/recipes" element={<RecipesPage />}/>
                <Route path="/recipes/:recipeId" element={<RecipePage />}/>
            </Routes>
        </BrowserRouter>
)
  }