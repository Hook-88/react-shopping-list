import { BrowserRouter, Route, Routes } from "react-router-dom"
import ShoppingListPage from "./pages/ShoppingList/ShoppingListPage"

export default function AppBrowserRouter() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ShoppingListPage />}/>
            </Routes>
        </BrowserRouter>
)
  }