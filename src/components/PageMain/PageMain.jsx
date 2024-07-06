export default function PageMain({children}) {
    return (
        <>
            <main className="p-4 flex flex-col gap-4">
                {children}
            </main>
        </>
    )
}