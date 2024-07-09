import { useNavigate, useParams } from "react-router-dom"
import PageHeader from "../../components/PageHeader/PageHeader"
import useRecipeNameSnapshot from "../../hooks/useRecipeNameSnapshot"
import getStringFirstCharCap from "../../utility/getStringFirstCharCap"
import PageMain from "../../components/PageMain/PageMain"
import { useAtom } from "jotai"
import { confirmDialogAtom, pageFormsOpenAtom } from "../../store/store"
import NavLinkBack from "../../components/Links/NavLinkBack"
import useIngredientSnapshot from "../../hooks/useIngredientSnapshot"
import EditIngredientEl from "./EditIngredientEl"
import DeleteIngredientEl from "./DeleteIngredientEl"
import ConfirmDialog from "../../components/ConfirmDialog.jsx/ConfirmDialog"
import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../../firebase"

export default function IngredientEditPage() {
    const params = useParams()
    const ingredient = useIngredientSnapshot(params.recipeId, params.ingredientId)
    const [confirmObj, setConfirmObj] = useAtom(confirmDialogAtom)
    const navigate = useNavigate()
    const [formOn, setFormOn] = useAtom(pageFormsOpenAtom)

    function handleClickDelete() {
        setConfirmObj({
            question: "Delete ingredient?",
            onConfirm: () => handleDeleteIngredient()
        })
    }

    function handleDeleteIngredient() {
        deleteFirebaseIngredient()
        navigate("./../..")
    }

    async function deleteFirebaseIngredient() {
        const docRef = doc(db, `recipes/${params.recipeId}/ingredients`, params.ingredientId)

        await deleteDoc(docRef)
    }
    
    return (
        <>
            <PageHeader>
                <NavLinkBack to="./../.."/>
                <PageHeader.Title>
                    Edit ingredient
                </PageHeader.Title>
            </PageHeader>

            <PageMain>
                {
                    ingredient && 
                    <>
                        {
                            formOn ? 
                            <EditIngredientEl nameValue={ingredient.name} onCancel={() => setFormOn(false)}/> :
                            <div 
                                    className="bg-white/10 px-4 py-3 rounded-md flex items-center justify-between gap-2"
                                    onClick={() => setFormOn(true)}
                                >
                                    {getStringFirstCharCap(ingredient.name)}
                                    <small className="mr-auto mt-1">
                                        (Click to edit)
                                    </small>
                                    {/* <button 
                                        className="flex items-center justify-end px-4 py-4"
                                        // onClick={handleClick}
                                    >
                                        {
                                            isFavorite ? 
                                                <FaStar  className="text-yellow-500"/> : 
                                                <FaRegStar />
                                        }
                                    </button> */}
                                    

                                </div>

                        }
                        
                        
                    </>
                }

                <DeleteIngredientEl onClick={handleClickDelete}/>

            </PageMain>
            {
                confirmObj && <ConfirmDialog />
            }
            
        </>
    )
}