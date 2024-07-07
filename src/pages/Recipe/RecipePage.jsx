import { useEffect, useState } from "react"
import PageHeader from "../../components/PageHeader/PageHeader"
import PageMain from "../../components/PageMain/PageMain"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../../firebase"
import NavLinkTo from "../../components/Links/NavLinkTo"
import getStringFirstCharCap from "../../utility/getStringFirstCharCap"
import Menu from "../../components/Menu/Menu"
import { FaEllipsis } from "react-icons/fa6"
import { useAtom } from "jotai"
import { pageFormsOpenAtom } from "../../store/store"
import { useParams } from "react-router-dom"

export default function RecipePage() {
    const params = useParams()
    
    
    return (
        <>
            <PageHeader>
                <PageHeader.Title>{getStringFirstCharCap(params.recipeName)}</PageHeader.Title>
                {/* <Menu className="flex items-center">
                    <Menu.Button className="w-full h-full flex items-center justify-end">
                        <span className="p-1 border border-transparent">
                            <FaEllipsis />
                        </span>
                    </Menu.Button>
                    
                    <Menu.Dropdown>
                        <Menu.Item 
                            className="px-4 py-1 border-b border-white/10 text-nowrap"
                            onClick={handleClickAdd}
                        >
                            Add Recipe
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu> */}
            </PageHeader>
                <PageMain>
                {/* {
                    recipes && (
                        <ul>
                            {
                                recipes.map(recipe => (
                                    <li key={recipe.id}>
                                        <NavLinkTo to={recipe.id}>
                                            {getStringFirstCharCap(recipe.name)}
                                        </NavLinkTo>
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }

                { openForm && <AddRecipeEl /> } */}
            </PageMain>
        </>
    )
}