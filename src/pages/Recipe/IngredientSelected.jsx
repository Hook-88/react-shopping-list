import List from "../../components/List/List"
import getCapString from "../../utility/getCapString"
import IconCheck from "../../components/Icons/IconCheck"


export default function IngredientSelected({ingredientObj}) {

    return (
        <li key={ingredientObj.id}>
            <List.Item className="flex items-center justify-between gap-4 border-green-900 border-2 font-bold">
                {getCapString(ingredientObj.name)}
                <IconCheck />
            </List.Item>
        </li> 
    )
}