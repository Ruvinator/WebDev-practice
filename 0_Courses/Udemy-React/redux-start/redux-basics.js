// Self-contained code showing how Redux is used
// (not associated with the project)
const redux = require('redux');  // Node.js syntax (not React)
const createStore = redux.createStore;

const initialState = {
    counter: 0
};  // used to initialize state

// ===== Reducer =====
// Must define reducer before store as it's passed as argument during store creation
// Default value provided for state (whenever it's undefined will use initialState)
const rootReducer = (state=initialState, action) => {
    if (action.type === 'INC_COUNTER') {
        // IMPORTANT: must always do this immutably (spread objects)
        return {
            ...state,
            counter: state.counter + 1
        };
    }
    else if (action.type === 'ADD_COUNTER') {
        return {
            ...state,
            counter: state.counter + action.value
        };
    }

    return state  // most basic reducer definition - return old state
};

// ===== Store =====
// Reducer is strongly connected to the store
const store = createStore(rootReducer);  // needs to be initialized with reducer

// ===== Subscription =====
// `subscribe()` argument is function executed whenever state is updated
// Function passed in does not take any arguments
store.subscribe(() => {
    console.log('[Subscription] ', store.getState());
});

// ===== Dispatching Action =====
// dispatch() takes an action argument (JS object which must have `type:` property)
// `type:` can be defined to be anything; convention is to use all caps
store.dispatch({type: 'INC_COUNTER'});  // increase by 1 (no payload needed)
store.dispatch({type: 'ADD_COUNTER', value: 10});  // adds number to counter (need payload)