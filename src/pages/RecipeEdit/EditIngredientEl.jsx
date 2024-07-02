import PageHeader from "../../components/PageHeader/PageHeader"
import LinkNavBack from "../../components/Links/LinkNavBack"
import { useContext, useEffect } from "react"
import { RecipeContext } from "../Recipe/RecipeState"
import Card from "../../components/Card"
import List from "../../components/List/List"
import { useParams } from "react-router-dom"
import getCapString from "../../utility/getCapString"
import Menu from "../../components/Menu/Menu"
import IconMore from "../../components/Icons/IconMore"
import Form from "../../components/Form"
import Button from "../../components/Buttons/Button"
import { FormContext } from "../../Context/FormContextComponent"
import AddIngredientEl from "./AddIngredientEl"
import RecipeEditMenu from "./RecipeEditMenu"
import InputCheckbox from "../../components/InputCheckbox"
import { editIngredientFormAtom } from "../../store/store"
import { useAtom } from "jotai"
import { deleteDoc, doc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase/firebase"
import { FaAngleDown } from "react-icons/fa6"
import { DialogConfirmContext } from "../../components/DialogConfirm/DialogConfirm"
DialogConfirmContext

export default function EditIngredientEl({ingredient}) {
    const [formData, setFormData] = useAtom(editIngredientFormAtom)
    const { setDialogObj } = useContext(DialogConfirmContext)
    const { recipeId } = useParams()
    const {
        recipeObj, 
        updateRecipeObj,
        setRecipeObj, 
        clearRecipeObj, 
        setIngredientsSelect
    
    } = useContext(RecipeContext)

    function handleChange(event) {
        const {name, value, type, checked} = event.target
        
        setFormData(prevFormData => (
            {
                ...prevFormData,
                [name] : type === "checkbox" ? checked : value
            }

        ))
    }

    useEffect(() => {
        setFormData({ingredientName: ingredient.name, optional: ingredient.optional})
    }, [])

    async function setIngredientNameInFirebase() {
        const docRef = doc(db, `recipes/${recipeId}/ingredients`, ingredient.id)
        
        await updateDoc(docRef, { name: formData.ingredientName })
    }

    async function setIngredientOptionalInFirebase(value) {
        const docRef = doc(db, `recipes/${recipeId}/ingredients`, ingredient.id)

        await updateDoc(docRef, { optional: value })

    }

    async function deleteFirebaseIngredient() {
        const docRef = doc(db, `recipes/${recipeId}/ingredients`, ingredient.id)

        await deleteDoc(docRef)
    }

    function handleSubmit() {
        setIngredientNameInFirebase()
        console.log("name updated")
        setIngredientOptionalInFirebase(formData.optional)

        // if (formData?.optional) {
        //     console.log("had optional")
        //     setIngredientOptionalInFirebase(formData.optional)
        // }

        clearSelection()
    }

    function clearSelection() {
        setRecipeObj(prevRecipeObj => (
            {
                ...prevRecipeObj,
                ingredients: prevRecipeObj.ingredients
                    .map(ingredient => ({ ...ingredient, selected: false }))
            }

        ))
    }

    function handleClickClose(event) {
        event.stopPropagation()
        clearSelection()
    }

    function handleClickDelete() {
        setDialogObj({
            question: "Delete ingredient?",
            confirmCallbackFn: () => deleteFirebaseIngredient()
        })
    }

    console.log(formData)

    const labelClassName = formData?.optional ? 
        "px-4 py-1 border border-white/30 rounded-lg flex items-center justify-center bg-cyan-900" : 
        "py-1 px-4 border border-white/30 rounded-lg flex items-center justify-center" 
    
    return (
        <Card className="px-2">
            <Form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                <div className="flex gap-3">
                    <input 
                        type="text" 
                        placeholder="Items..."
                        className="bg-white/15 rounded-lg px-2 flex-grow"
                        name="ingredientName"
                        onChange={handleChange}
                        value={formData?.ingredientName ? getCapString(formData.ingredientName) : ""}
                    />
                    {/* <InputCheckbox /> */}
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
                        onChange={handleChange}
                        className="hidden"
                    />

                </div>
                
                <div className="flex gap-3">

                    <div className="flex flex-grow">
                        <Button className="bg-green-900 rounded-none rounded-l-lg flex-grow">
                            Save
                        </Button>
                        <Menu>
                            <Menu.Button 
                                className="bg-green-900 border border-white/30 px-1 border-l-0 rounded-none rounded-r-lg"
                                type="button"
                            >
                                <FaAngleDown />
                            </Menu.Button>
                            <Menu.Dropdown>
                                <Menu.Item 
                                    className="bg-red-900 rounded-lg"
                                    onClick={handleClickDelete}
                                
                                >
                                    Delete ingredient
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>
                    </div>
                    

                    <Button 
                        className="bg-red-900" 
                        type="button"
                        onClick={handleClickClose}
                    >
                        x
                    </Button>
                </div>

                
            </Form>
        </Card> 
    )
}