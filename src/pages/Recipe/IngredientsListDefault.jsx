import { useEffect, useState } from "react"
import List from "../../components/List/List"
import { useStore } from "../../store/store"
import Ingredient from "./Ingredient"

export default function IngredientsListDefault() {
    const ingredients = useStore(state => state.ingredients)

    return (        
        <List>
            {
                ingredients.map(ingredient => (
                    <Ingredient key={ingredient.id} ingredientId={ingredient.id}/> 
                ))
            }
        </List>
    )
}