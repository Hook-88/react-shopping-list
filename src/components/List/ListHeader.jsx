import { twMerge } from "tailwind-merge"

export default function ListHeader({children, className}) {
    const ListHeaderClassName = twMerge(
        "px-4 flex",
        className
    )

    return (
        <div className={ListHeaderClassName}>
            {children}
        </div>
    )
}