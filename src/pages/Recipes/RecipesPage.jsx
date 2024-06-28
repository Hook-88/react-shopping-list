import PageHeader from "../../components/PageHeader/PageHeader"
import { useAtomValue } from "jotai"
import { formDataAtom } from "../../store/store"
import LinkNavBack from "../../components/Links/LinkNavBack"

export default function RecipesPage() {
    const formData = useAtomValue(formDataAtom)
    
    return (
        <>
            <PageHeader>
                <LinkNavBack className="col-span-2"/>
                <PageHeader.Title className="col-start-3 col-span-5">Recipes</PageHeader.Title>
            </PageHeader>
            <main className="mt-12 px-4 flex flex-col gap-4">

            </main>
        </>
    )
}