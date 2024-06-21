export default function Form({children, className, onSubmit = () => {}, ...rest}) {
    
    function handleSubmit(event) {
        event.preventDefault()
        onSubmit()
    }

    return (
        <form className={className} onSubmit={handleSubmit} {...rest}>
            {children}
        </form>
    )
}