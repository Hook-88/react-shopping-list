import { useRef } from "react"

export default function Form({children, className, onSubmit = () => {}, ...rest}) {
    const formRef = useRef()
    
    function handleSubmit(event) {
        event.preventDefault()
        onSubmit()
        setTimeout(() => {
            formRef.current?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
        }, 200)
    }

    return (
        <form className={className} onSubmit={handleSubmit} {...rest} ref={formRef}>
            {children}
        </form>
    )
}