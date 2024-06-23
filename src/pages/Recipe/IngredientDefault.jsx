import List from "../../components/List/List"
import getCapString from "../../utility/getCapString"

export default function IngredientDefault({ingredientObj}) {

    return (
        <li key={ingredientObj.id} className="border border-transparent">
            <List.Item className="flex items-center gap-4">
                {getCapString(ingredientObj.name)}
            </List.Item>
        </li> 
    )
}