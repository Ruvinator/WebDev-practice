export const INCREMENT     = 'INCREMENT';
export const DECREMENT     = 'DECREMENT';
export const ADD           = 'ADD';
export const SUBTRACT      = 'SUBTRACT';
export const STORE_RESULT  = 'STORE_RESULT';
export const DELETE_RESULT = 'DELETE_RESULT';

export const increment = () => {
    return {
        type: INCREMENT
    }
};

export const decrement = () => {
    return {
        type: DECREMENT
    }
};

export const add = value => {
    return {
        type: ADD,
        value
    }
};

export const subtract = value => {
    return {
        type: SUBTRACT,
        value  // Same as `value: value` (ES6)
    }
};

// SYNCHRONOUS action creator
export const saveResult = result => {
    return {
        type: STORE_RESULT,
        res: result
    };
};

// ASYNCHRONOUS counterpart which calls the synchronous action creator
export const storeResult = result => {
    // Have access to dispatch here due to thunk middleware
    return dispatch => {
        // Simulating asynchronous info storage (2 second gap)
        setTimeout(() => {
            // Executing action creator as function and pass in payload
            dispatch(saveResult(result))
        }, 2000);
    };
};

export const deleteResult = id => {
    return {
        type: DELETE_RESULT,
        resultElementId: id
    }
};