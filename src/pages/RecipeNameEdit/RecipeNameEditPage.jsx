import { useParams } from "react-router-dom"
import PageHeader from "../../components/PageHeader/PageHeader"
import useRecipeNameSnapshot from "../../hooks/useRecipeNameSnapshot"
import getStringFirstCharCap from "../../utility/getStringFirstCharCap"
import PageMain from "../../components/PageMain/PageMain"
import EditRecipeNameEl from "./EditRecipeNameEl"
import NavLinkBack from "../../components/Links/NavLinkBack"
import { useState } from "react"
import { FaRegStar, FaStar } from "react-icons/fa6"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase"

export default function RecipeNameEditPage() {
    const params = useParams()
    const recipeName = useRecipeNameSnapshot(params.recipeId)
    const [formOn, setFormOn] = useState(false)

    async function toggleFirebaseRecipeIsFavorite() {
        const docRef = doc(db, "recipes", params.recipeId)
        const docSnap = await getDoc(docRef)

        await updateDoc(docRef, {isFavorite: !docSnap.data().isFavorite})
    }

    function handleClick(event) {
        event.stopPropagation()
        toggleFirebaseRecipeIsFavorite()
    }
    
    return (
        <>
            <PageHeader>
                <NavLinkBack />
                <PageHeader.Title>
                    {/* {recipeName?.name ? `${getStringFirstCharCap(recipeName.name)} (edit)` : "Loading..."} */}
                    Recipe name
                </PageHeader.Title>
            </PageHeader>

            {
                recipeName && (
                    <PageMain>
                        
                        {
                            formOn ? <EditRecipeNameEl nameValue={recipeName.name} onCancel={() => setFormOn(false)}/> : (
                                <div 
                                    className="bg-white/10 pl-4 rounded-md flex items-center justify-between gap-2"
                                    onClick={() => setFormOn(true)}
                                >
                                    {getStringFirstCharCap(recipeName.name)}
                                    <small className="mr-auto mt-1">
                                        (Click to edit)
                                    </small>
                                    <button 
                                        className="flex items-center justify-end px-4 py-4"
                                        onClick={handleClick}
                                    >
                                        {
                                            recipeName?.isFavorite ? 
                                                <FaStar  className="text-yellow-500"/> : 
                                                <FaRegStar />
                                        }
                                    </button>
                                    

                                </div>
                            )
                        }
                        
                    </PageMain>
                )
            }
        </>
    )
}