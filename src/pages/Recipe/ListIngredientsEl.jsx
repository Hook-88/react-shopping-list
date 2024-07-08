import ListItemDefault from "./ListItemDefault"
import ListItemSelected from "./ListItemSelected"
import ListHeader from "./ListHeader"

export default function ListIngredientsEl({localIngredients, toggleSelect, selectAllIngredients}) {
    
    return (
        <div>
            <ListHeader 
                ingredients={localIngredients}
                selectAll={selectAllIngredients}
            />
            <ul>
                {
                    localIngredients.map(ingredient => ( ingredient.selected ? 
                        
                        <ListItemSelected
                            key={ingredient.id} 
                            onClick={() => toggleSelect(ingredient.id)}
                        >
                            {ingredient.name}
                        </ListItemSelected> :

                        <ListItemDefault
                            key={ingredient.id} 
                            onClick={() => toggleSelect(ingredient.id)}
                        >
                            {ingredient.name}
                        </ListItemDefault>
                    ))
                }
            </ul>
        </div>
    )
}