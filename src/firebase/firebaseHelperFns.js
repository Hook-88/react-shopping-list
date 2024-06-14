async function deleteSelected() {
    const newListArray = shoppingList.items.filter(item => item.selected === false)
    
    await updateDoc(generalListDocRef, {items: newListArray})
}



