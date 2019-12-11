import { all, fork } from 'redux-saga/effects';
import { watchINC, watchDES } from './counterSaga';

export function* rootSaga() {
    // yield all();
    yield all([fork(watchINC), fork(watchDES)]);
}
