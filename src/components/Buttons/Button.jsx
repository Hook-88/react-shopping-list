import { twMerge } from "tailwind-merge"

export default function Button({children, className, ...rest}) {
    const ButtonClassName = twMerge(
        "py-1 px-4 border border-white/30 rounded-lg flex items-center justify-center",
        className
    )
    
    return (
        <button className={ButtonClassName} {...rest}>
            {children}
        </button>
    )
}