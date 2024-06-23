import List from "../../components/List/List"
import getCapString from "../../utility/getCapString"

export default function IngredientSelected({ingredientObj}) {

    return (
        <li key={ingredientObj.id}>
            <List.Item to={ingredientObj.id} className="bg-green-800">
                {getCapString(ingredientObj.name)}
            </List.Item>
        </li> 
    )
}