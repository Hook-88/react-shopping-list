export default function Form({children, onSubmit = () => {}, ...rest}) {

    function handleSubmit(event) {
        event.preventDefault()
        onSubmit()
    }
    
    return (
        <form
            {...rest} 
            className="grid grid-cols-6 p-4 gap-2 border border-white/35 rounded-lg"
            onSubmit={handleSubmit}
        >
            {children}
        </form>
    )
}