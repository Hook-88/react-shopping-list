import { atom } from "jotai"
import { create } from 'zustand'

export const addNewItemAtom = atom(false)
export const hideCheckedItemsAtom = atom(false)
export const menuOpenAtom = atom(false)


export const useStore = create((set) => ({
    shoppingList: [],
    updateShoppingList: (newList) => set({ shoppingList: newList }),
    formData: {},
    updateFormData: (newData) => set({ formData: newData }),
    
}))