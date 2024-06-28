import { createContext, useState } from "react"

const FilterContext = createContext()

export default function FilterContextComponent({children}) {
    const [filters, setFilters] = useState(null)

    function addFilter(filter) {
        setFilters(prevFilter => prevFilter ? [...prevFilter].push(filter) : [filter])
    }

    function clearFilters() {
        setFilters(null)
    }
    
    return (
        <FilterContext.Provider value={{filters, addFilter, clearFilters}}>
            {children}
        </FilterContext.Provider>
    )
}

export {FilterContext}