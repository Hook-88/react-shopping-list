export default function Form({children, className, onSubmit = () => {}}) {
    
    function handleSubmit(event) {
        event.preventDefault()
        onSubmit()
    }

    return (
        <form className={className} onSubmit={handleSubmit}>
            {children}
        </form>
    )
}