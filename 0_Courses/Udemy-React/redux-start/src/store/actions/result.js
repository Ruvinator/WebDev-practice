import * as actionTypes from './actionTypes';

// Calls saga
export const storeResult = result => {
    return {
        type: actionTypes.INITIATE_STORE_RESULT,
        res: result,
        expirationTime: 2000
    };
};

// Is called by saga
export const storeResultSucceed = action => {
    return {
        type: actionTypes.STORE_RESULT,
        res: action.res
    };
};

export const deleteResult = id => {
    return {
        type: actionTypes.DELETE_RESULT,
        resultElementId: id
    }
};