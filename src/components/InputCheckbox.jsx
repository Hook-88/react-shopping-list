import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { FormContext } from "../Context/FormContextComponent"

export default function InputCheckbox() {
    const {recipeId} = useParams()
    const { formData, handleChange, clearFormData, openForm, setFormData } = useContext(FormContext)

    function handleClickClose() {
        clearFormData()
    }

    function handleOnChange(event) {
        handleChange(event)
    }

    const labelClassName = formData?.optional ? 
        "px-4 py-1 border border-white/30 rounded-lg flex items-center justify-center bg-cyan-900" : 
        "py-1 px-4 border border-white/30 rounded-lg flex items-center justify-center"
    
    return (
        <>
            <label 
                htmlFor="ingredient-optional"
                className={labelClassName}
            >
                Optional
            </label>
            <input 
                type="checkbox" 
                id="ingredient-optional"
                checked={formData?.optional ?? ""} 
                name="optional" 
                onChange={handleOnChange}
                className="hidden"
            />
        </>
    )
}