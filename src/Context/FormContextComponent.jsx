import { createContext, useState } from "react"

const FormContext = createContext()

export default function FormContextComponent({children}) {
    const [formData, setFormData] = useState(null)

    function handleChange(event) {
        const {name, value, checked, type} = event.target

        setFormData(prevFormData => (
            { 
                ...prevFormData, 
                [name]: type === "checkbox" ? checked : value
            }

        ))  
    }

    function clearFormData() {
        setFormData(null)
    }

    function openForm() {
        setFormData(true)
    }

    
    return (
        <FormContext.Provider value={{formData, handleChange, clearFormData, openForm, setFormData}}>
            {children}
        </FormContext.Provider>
    )
}

export { FormContext }