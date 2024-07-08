export default function AddToShoppingListBtnEl({onClick, valueDisabled}) {
    
    return (
        <div className="bg-white/10 p-2 rounded-md flex">
            <button 
                className="flex-grow py-1 bg-green-900 rounded-md border border-white/10 disabled:bg-green-900/30 disabled:text-white/30"
                disabled={valueDisabled}
                onClick={onClick}
            >
                Add to shopping list
            </button>
        </div>
    )
}
