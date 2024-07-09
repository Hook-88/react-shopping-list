import { useParams } from "react-router-dom"
import useRecipeNameSnapshot from "../../hooks/useRecipeNameSnapshot"
import getStringFirstCharCap from "../../utility/getStringFirstCharCap"
import { FaRegStar, FaStar } from "react-icons/fa6"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../../firebase"
import { useAtom } from "jotai"
import { pageFormsOpenAtom } from "../../store/store"

export default function RecipeNameCard({children, isFavorite}) {
    const params = useParams()
    // const recipeName = useRecipeNameSnapshot(params.recipeId)
    const [formOn, setFormOn] = useAtom(pageFormsOpenAtom)

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
        <div 
            className="bg-white/10 pl-4 rounded-md flex items-center justify-between gap-2"
            onClick={() => setFormOn(true)}
        >
            {getStringFirstCharCap(children)}
            <small className="mr-auto mt-1">
                (Click to edit)
            </small>
            <button 
                className="flex items-center justify-end px-4 py-4"
                onClick={handleClick}
            >
                {
                    isFavorite ? 
                        <FaStar  className="text-yellow-500"/> : 
                        <FaRegStar />
                }
            </button>
            

        </div>
    )
}