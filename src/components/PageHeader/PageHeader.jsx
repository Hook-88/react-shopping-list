import { twMerge } from "tailwind-merge"
import PageHeaderTitle from "./PageHeaderTitle"

export default function PageHeader({children, className}) {
    const PageHeaderClassName = twMerge(
        "py-2 px-4 grid grid-cols-9 font-bold text-lg fixed inset-x-0 top-0 bg-black/80",
        className
    )
    
    return (
        <header className={PageHeaderClassName}>
            {children}
        </header>
    )
}

PageHeader.Title = PageHeaderTitle