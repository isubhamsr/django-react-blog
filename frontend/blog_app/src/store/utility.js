export const updateObjects = (oldObjects, updatedObjects) =>{
    return{
        ...oldObjects,
        ...updatedObjects
    }
}