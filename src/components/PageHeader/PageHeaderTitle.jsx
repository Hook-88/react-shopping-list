import { twMerge } from "tailwind-merge"

export default function PageHeaderTitle({children, className}) {
    const PageHeaderTitleClassName = twMerge(
        "w-full text-center",
        className
    )
    
    return <h1 className={PageHeaderTitleClassName}>{children}</h1>
}