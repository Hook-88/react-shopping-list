import { createContext, useState } from "react"

const FilterContext = createContext()

export default function FilterContextComponent({children}) {
    const [filters, setFilters] = useState(null)

    function clearFilters() {
        setFilters(null)
    }
    
    return (
        <FilterContext.Provider value={{filters, setFilters, clearFilters}}>
            {children}
        </FilterContext.Provider>
    )
}

export {FilterContext}