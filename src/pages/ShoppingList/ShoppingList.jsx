import List from "../../components/List/List"
import AddButton from "../../components/Buttons/AddButton"
import SubtractButton from "../../components/Buttons/SubtractButton"
import getCapString from "../../utility/getCapString"

export default function ShoppingList({listArr}) {
    
    return (
        <List>
            {
                listArr.map(item => (
                    <List.Item key={item.id}>
                        {getCapString(item.name)}
                        {
                            item.quantity > 1 &&
                            <>
                                &nbsp;
                                {`(${item.quantity}x)`}
                            </>
                        }
                        <div className="ml-auto flex gap-2">
                            {
                                item.quantity > 1 && 
                                <SubtractButton />
                            }
                            <AddButton />
                        </div>
                    </List.Item>
                ))
            }
        </List>
    )
}