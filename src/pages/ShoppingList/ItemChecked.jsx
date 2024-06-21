import IconCheck from "../../components/Icons/IconCheck"
import getCapString from "../../utility/getCapString"
import { useStore } from "../../store/store"

export default function ItemChecked({itemId}) {
    const item = useStore(state => state.shoppingList.find(item => item.id === itemId))

    return (
        <div className="py-2 px-4 border border-white/30 rounded-lg cursor-pointer flex bg-green-700/50">
            {getCapString(item.name)}
            {
                item.quantity > 1 &&
                <>
                    &nbsp;
                    {`(${item.quantity}x)`}
                </>
            }
            <IconCheck className="ml-auto p-1 border border-transparent"/>
        </div>
    )
}