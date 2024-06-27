import { createContext, useState } from "react"

const FormContext = createContext()

export default function FormContextComponent({children}) {
    const [formData, setFormData] = useState(null)

    function handleChange(event) {
        const {name, value} = event.target

        setFormData(prevFormData => ({ ...prevFormData, [name]: value}))  
    }

    function clearFormData() {
        setFormData(null)
    }

    function openForm() {
        setFormData(true)
    }

    
    return (
        <FormContext.Provider value={{formData, handleChange, clearFormData, openForm}}>
            {children}
        </FormContext.Provider>
    )
}

export { FormContext }