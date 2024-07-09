export default function DeleteIngredientEl({onClick}) {
    
    return (
        <div className="bg-white/10 p-2 rounded-md flex">
            <button 
                className="flex-grow py-1 bg-red-900 rounded-md border border-white/10"
                onClick={onClick}
            >
                Delete ingredient
            </button>
        </div>
    )
}