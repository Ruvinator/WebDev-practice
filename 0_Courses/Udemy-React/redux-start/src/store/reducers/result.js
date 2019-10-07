import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    results: []
}

// Implement utility function to simplify switch statement as much as possible
const deleteResult = (state, action) => {
    // `filter()` returns a new array; function arg is executed on each element in array
    const updatedArray = state.results.filter(result => result.id !== action.resultElementId);
    return updateObject(state, { results: updatedArray });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_RESULT:  return updateObject(state, { results: state.results.concat({ id: new Date(), value: action.res }) });
        case actionTypes.DELETE_RESULT: return deleteResult(state, action);
        default:                        return state;
    };
};

export default reducer;