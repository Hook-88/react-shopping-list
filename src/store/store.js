import { create } from 'zustand'

// export const useStore = create((set) => ({
//     bears: 0,
//     increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//     removeAllBears: () => set({ bears: 0 }),
//     updateBears: (newBears) => set({ bears: newBears }),
//  }))

export const useStore = create(set => ({
    confirmModal: null,
    updateConfirmModal: (obj) => set({ confirmModal: obj}),
    closeModal: () => set({ confirmModal: null })
    
}))


// export function showModal(onConfirm, confirmQuestion = "Are you sure") {
//     const updateConfirmModal = useStore(state => state.updateConfirmModal)
    
//     updateConfirmModal({
//         confirmQuestion,
//         onConfirm
//     })
// }