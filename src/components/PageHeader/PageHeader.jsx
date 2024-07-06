import PageHeaderTitle from "./PageHeaderTitle"

export default function PageHeader({children}) {

    return (
        <header className="bg-white/10 py-2 grid grid-cols-6 px-4">
            {children}
        </header>
    )
}

PageHeader.Title = PageHeaderTitle