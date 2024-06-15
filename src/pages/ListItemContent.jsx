export default function ListItemContent({item}) {
    
    return (
        <>
            <p className="border border-white/0">
                {item.name}
                &nbsp;
                { item.quantity > 1 && `(${item.quantity}x)` }
            </p>


            <div className="flex gap-2 ml-auto">
                {
                    item.quantity > 1 &&
                    <SubtractButton 
                        onClick={e => {
                            e.stopPropagation()
                            modifyQuantity(item.id, -1)
                        }}
                    />
                }
                <AddButton 
                    onClick={e => {
                        e.stopPropagation()
                        modifyQuantity(item.id, 1)
                    }}
                />       
            </div> 
        </>
    )
}