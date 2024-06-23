import List from "../../components/List/List"
import getCapString from "../../utility/getCapString"

export default function IngredientDefault({ingredientObj}) {

    return (
        <li key={ingredientObj.id}>
            <List.Item to={ingredientObj.id}>{getCapString(ingredientObj.name)}</List.Item>
        </li> 
    )
}