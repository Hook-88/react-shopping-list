import { BrowserRouter, Route, Routes } from "react-router-dom"

import ShoppingListPage from "./pages/ShoppingListPage"


export default function App() {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ShoppingListPage />}/>
            </Routes>
        </BrowserRouter>
    )
  }