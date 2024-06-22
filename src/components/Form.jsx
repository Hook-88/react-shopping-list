import { useRef } from "react"

export default function Form({children, className, onSubmit = () => {}, ...rest}) {
    const formRef = useRef()
    
    function handleSubmit(event) {
        event.preventDefault()
        onSubmit()
        formRef.current.scrollIntoView()
    }

    return (
        <form className={className} onSubmit={handleSubmit} {...rest} ref={formRef}>
            {children}
        </form>
    )
}