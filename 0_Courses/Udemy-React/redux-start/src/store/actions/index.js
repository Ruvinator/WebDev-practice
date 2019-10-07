// Used for exporting all action creators
// Useful for large projects as only have to import from here

// Can export from another file without importing it into this file
export {
    add,
    subtract,
    increment,
    decrement
} from './counter';

export {
    storeResult,
    storeResultSucceed,
    deleteResult
} from './result';