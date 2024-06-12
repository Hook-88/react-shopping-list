import { twMerge } from "tailwind-merge"

export default function Card({children, className}) {
    const CardClassName = twMerge(
        "backdrop-blur-md bg-black/10 grid grid-cols-6 p-4 gap-4 border border-white/35 rounded-lg",
        className
    )

    return (
        <div className={CardClassName}>
            {children}
        </div>
    )
}