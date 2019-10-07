import * as actionTypes from '../actions/actions';

const initialState = {
    results: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.STORE_RESULT):
            return {
                ...state,
                results: state.results.concat({id: new Date(), value: action.res})
            };
        case (actionTypes.DELETE_RESULT):
            // `filter()` returns a new array; function arg is executed on each element in array
            const updatedArray = state.results.filter(result => result.id !== action.resultElementId);
            return {
                ...state,
                results: updatedArray
            };
        default:
            return state;
    };
};

export default reducer;