import { useEffect, useState } from "react"
import List from "../../components/List/List"
import { useStore } from "../../store/store"
import Ingredient from "./Ingredient"
import IconCheck from "../../components/Icons/IconCheck"

export default function IngredientsListDefault() {
    const ingredients = useStore(state => state.ingredients)
    const setIngredients = useStore(state => state.setIngredients)
    const ingredientsSelected = ingredients.filter(ingredient => ingredient.selected === true)

    function selectAllIngredients(value) {
        const arr = ingredients.map(ingredient => ({...ingredient, selected: value}))
        setIngredients(arr)
    }

    function toggleSelectAll() {
        
        if (ingredientsSelected.length === ingredients.length) {
            selectAllIngredients(false)

            return
        }

        selectAllIngredients(true)
    }

    return (        
        <div className="flex flex-col gap-1">
            <List.Header>
                {
                    ingredientsSelected.length > 0 &&
                    <List.Progress totalLength={ingredients.length} currentLength={ingredientsSelected.length}/>
                }
                <button 
                    className="text-sm col-span-2 col-start-5 justify-end items-center pr-4 flex gap-1"
                    onClick={toggleSelectAll}
                >
                    {
                        ingredientsSelected.length === ingredients.length ?
                        "Clear selection" :
                        <>
                            Select all
                            <IconCheck />
                        </>
                    }
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