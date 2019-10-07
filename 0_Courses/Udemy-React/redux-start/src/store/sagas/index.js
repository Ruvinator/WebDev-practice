import { takeEvery } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { storeResultSaga } from './result';

// Set up saga listener (listen for INITIATE_STORE_RESULT)
export function* watchStoreResult() {
    // Will run saga whenever subscribed action type is called
    yield takeEvery(actionTypes.INITIATE_STORE_RESULT, storeResultSaga);
}