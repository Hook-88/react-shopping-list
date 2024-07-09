import NavLinkTo from "../../components/Links/NavLinkTo"
import getStringFirstCharCap from "../../utility/getStringFirstCharCap"

export default function RecipeIngredientsEl({ingredients}) {
    
    return (
        <div>
            <div className="flex items-center justify-between px-4 mb-1">
                <small>Recipe Ingredients</small>
            </div>

            <ul>
                {
                    ingredients.map(ingredient => (
                        <li key={ingredient.id}>
                            <NavLinkTo to={`ingredient/${ingredient.id}`}>
                                {getStringFirstCharCap(ingredient.name)}
                            </NavLinkTo>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}