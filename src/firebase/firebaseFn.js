import { doc, deleteDoc } from "firebase/firestore"
import { db } from "./firebase"

async function deleteDocFromFirebaseCollection(collectionString, docId) {
    const docRef = doc(db, collectionString, docId)

    await deleteDoc(docRef)
}

export { deleteDocFromFirebaseCollection }