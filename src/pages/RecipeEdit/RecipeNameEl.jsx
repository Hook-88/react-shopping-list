import PageHeader from "../../components/PageHeader/PageHeader"
import { useLocation, useParams } from "react-router-dom"
import PageMain from "../../components/PageMain/PageMain"
import NavLinkTo from "../../components/Links/NavLinkTo"
import getStringFirstCharCap from "../../utility/getStringFirstCharCap"

export default function RecipeNameEl() {
    const { recipeName } = useParams()
    
    return (
        <div>

            <div className="flex items-center justify-between px-4 mb-1">
                <small>Recipe Name</small>
            </div>

            <NavLinkTo to="name">
                {getStringFirstCharCap(recipeName)}
            </NavLinkTo>

        </div>
    )
}