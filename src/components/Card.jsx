import { twMerge } from "tailwind-merge"

export default function Card({children, className}) {
    const CardClassName = twMerge(
        "p-4 border border-white/30 rounded-lg",
        className
    )

    return (
        <div className={CardClassName}>
            {children}
        </div>
    )
}