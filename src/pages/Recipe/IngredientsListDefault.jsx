import { useEffect, useState } from "react"
import List from "../../components/List/List"
import { useStore } from "../../store/store"
import Ingredient from "./Ingredient"
import IconCheck from "../../components/Icons/IconCheck"

export default function IngredientsListDefault() {
    const ingredients = useStore(state => state.ingredients)

    return (        
        <div className="flex flex-col gap-1">
            <List.Header>
                <List.Progress totalLength={ingredients.length} currentLength={ingredients.length}/>
                <button className="text-sm col-span-2 col-start-5 justify-end items-center pr-4 flex gap-1">
                    Select all
                    <IconCheck />
                </button>
            </List.Header>

            <List>
                {
                    ingredients.map(ingredient => (
                        <Ingredient key={ingredient.id} ingredientId={ingredient.id}/> 
                    ))
                }
            </List>

        </div> 
    )
}