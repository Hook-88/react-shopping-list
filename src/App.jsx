import { BrowserRouter, Route, Routes } from "react-router-dom"


export default function App() {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<h1>hello</h1>}/>
            </Routes>
        </BrowserRouter>
    )
  }