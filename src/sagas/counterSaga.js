import { delay, takeEvery, put } from 'redux-saga/effects';
import { INC_ASYNC, INC_SAGA, DES_ASYNC, DES_SAGA } from 'modules/countReducer';

function* incAsync() {
    yield delay(500);
    yield put({ type: INC_SAGA, value: 5 });
}

export function* watchINC() {
    yield takeEvery(INC_ASYNC, incAsync);
}

function* desAsync() {
    yield delay(500);
    yield put({ type: DES_SAGA, value: 3 });
}

export function* watchDES() {
    yield takeEvery(DES_ASYNC, desAsync);
}
