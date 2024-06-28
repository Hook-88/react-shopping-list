import { twMerge } from "tailwind-merge"

export default function ListHeader({children, className}) {
    const ListHeaderClassName = twMerge(
        "px-4 mb-1 flex",
        className
    )

    return (
        <div className={ListHeaderClassName}>
            {children}
        </div>
    )
}