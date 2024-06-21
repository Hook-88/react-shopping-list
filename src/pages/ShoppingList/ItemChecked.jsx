import List from "../../components/List/List"
import IconCheck from "../../components/Icons/IconCheck"
import getCapString from "../../utility/getCapString"

export default function ItemChecked({itemObj}) {

    return (
        <div className="py-2 px-4 border border-white/30 rounded-lg cursor-pointer flex bg-green-700/50">
            {getCapString(itemObj.name)}
            {
                itemObj.quantity > 1 &&
                <>
                    &nbsp;
                    {`(${itemObj.quantity}x)`}
                </>
            }
            <IconCheck className="ml-auto p-1 border border-transparent"/>
        </div>
    )
}