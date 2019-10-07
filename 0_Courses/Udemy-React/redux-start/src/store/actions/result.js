import * as actionTypes from './actionTypes';

// SYNCHRONOUS action creator
export const saveResult = result => {
    return {
        type: actionTypes.STORE_RESULT,
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
        type: actionTypes.DELETE_RESULT,
        resultElementId: id
    }
};