import { atom } from "jotai"
import { create } from 'zustand'

export const addNewItemAtom = atom(false)
export const hideCheckedItemsAtom = atom(false)
export const menuOpenAtom = atom(false)


export const useStore = create(set => ({
    shoppingList: [],
    updateShoppingList: newList => set({ shoppingList: newList }),

    formData: null,
    updateFormData: newData => set({ formData: newData }),
    closeform: () => set( {formData: null} ),

    filters: [],
    addFilter: value => set(state => ({ filters: [...state.filters, value]})),
    removeFilter: value => set(state => ({  filters: state.filters.filter(filter => filter !== value)})) 

}))