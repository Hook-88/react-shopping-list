import { BrowserRouter, Route, Routes } from "react-router-dom"

export default function App() {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<h1>Shopping list</h1>}/>
            </Routes>
        </BrowserRouter>
    )
  }