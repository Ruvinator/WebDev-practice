import { delay } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions/index';

// `function*` is a generator - can be exited and later re-entered.
// Context of generators is saved across re-entrances.
// Must put `yield` in front of all lines of code.
// Pass parameters in saga through action.
// Saga is not used properly since no side-effect code exists in this simple app;
// in general, sagas should handle the side-effect code.
export function* storeResultSaga(action) {
    // Delay now handled within the saga instead of in action creator
    yield delay(action.expirationTime);
    // Call another action creator as result of saga
    yield put(actions.storeResultSucceed(action));
}