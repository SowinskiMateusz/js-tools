/**
 * compares arrays by length and shallow equal
 * 
 * @param a 
 * @param b 
 */

export const isArrDifferent = <T extends unknown>(a: T[] = [], b: T[] = []): boolean => a.length !== b.length || a.some((el, index) => el !== b[index]);


/**
 * removes duplicates from array of simple values (array of strings, numbers etc, NOT objects)
 * 
 * @param arr 
 * 
 * how to use:
 * 
 * removeArrDuplicates(['a', 'b', 'c', 'a', 'b', 'd'])
 * 
 * will return:
 * 
 * ['a', 'b', 'c', 'd']
 * 
 */

//@ts-ignore
export const removeArrDuplicates = <T = unknown>(arr: T[]): T[] => [...new Set(arr)];


/**
 * removes duplicates from array of objects
 * immutable function, returns new array
 * 
 * @param arr 
 * @param callback 
 * 
 * how to use:
 * 
 * given array:
 * 
 * arr = [
 *      { id: 'abc', name: 'lorem' },
 *      { id: 'def', name: 'ipsum' },
 *      { id: 'ghi', name: 'ipsum' }
 * ]
 * 
 * removeDuplicatesByKey(arr, item => item.name)
 * 
 * will return:
 * 
 * [
 *      { id: 'abc', name: 'lorem' },
 *      { id: 'ghi', name: 'ipsum' }
 * ]
 * 
 */

export const removeDuplicatesByKey = <T = unknown>(arr: T[], callback: (object: T) => string): T[] => {
    const arrayAsObject: { [key: string]: T } = arr.reduce((acc, item) => ({
        ...acc,
        [callback(item)]: item
    }), {});
    return Object.values(arrayAsObject);
};


/**
 * updates one or more objects in array of objects when callback returns true
 * immutable function, returns new array
 * 
 * @param arr 
 * @param callback 
 * @param updater 
 * 
 * how to use:
 * 
 * updateObjectsInArray(arr, item => item.id === someId, { someProp: true })
 * updateObjectsInArray(arr, item => item.id === someId, item => { someProp: true, otherProp: item.whateva })
 * updateObjectsInArray(arr, item => item.id === someId, item => { ...item, someProp: true, otherProp: item.whateva })
 */

export const updateObjectsInArray = <T = unknown>(arr: T[], callback: ((object: T) => boolean), updater: Partial<T> | ((obj: T) => Partial<T>)): T[] => {
    return (arr || []).map(item => {
        if (callback(item)) {
            return {
                ...item,
                ...(typeof updater === 'function' ? updater(item) : updater)
            }
        } else {
            return item;
        }
    })
}


/**
 * convert array of objects to object with objects.
 * uses value returned from the callback as key
 * 
 * @param arr 
 * @param callback 
 * 
 * how to use:
 * 
 * given array:
 * 
 * arr = [
 *      { id: 'abc', name: 'lorem' },
 *      { id: 'def', name: 'ipsum' }
 * ]
 * 
 * arrayToObject(arr, item => item.id)
 * 
 * will return object:
 * 
 * {
 *      abc: { id: 'abc', name: 'lorem' },
 *       def: { id: 'def', name: 'ipsum' }
 * }
 */

export const arrayToObject = <T = unknown>(arr: T[], callback: (object: T) => string): { [key: string]: T } => {
    return (arr || []).reduce((obj, item) => ({
        ...obj,
        [callback(item)]: item
    }), {});
}
