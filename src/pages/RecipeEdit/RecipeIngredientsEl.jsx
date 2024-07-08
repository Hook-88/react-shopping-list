import NavLinkTo from "../../components/Links/NavLinkTo"


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
                                {ingredient.name}
                            </NavLinkTo>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}