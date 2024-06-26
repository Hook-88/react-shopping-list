import { twMerge } from "tailwind-merge"

export default function Card({children, className}) {
    const CardClassName = twMerge(
        "px-4 py-2 border border-white/30 rounded-lg bg-white/5",
        className
    )

    return (
        <div className={CardClassName}>
            {children}
        </div>
    )
}