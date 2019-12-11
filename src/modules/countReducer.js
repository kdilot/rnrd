import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

//  Actions Type
export const INCREMENT = 'count/INCREMENT';
export const DECREMENT = 'count/DECREMENT';
export const INC_SAGA = 'count/INC_SAGA';
export const DES_SAGA = 'count/DES_SAGA';
export const INC_ASYNC = 'count/INC_ASYNC';
export const DES_ASYNC = 'count/DES_ASYNC';

//  Actions
export const setIncrement = createAction(INCREMENT);
export const setDecrement = createAction(DECREMENT);
export const setIncrementSaga = createAction(INC_ASYNC);
export const setDecrementSaga = createAction(DES_ASYNC);

// Default State
const initialState = {
    count: 0,
};

export default handleActions(
    {
        [INCREMENT]: (state, action) =>
            produce(state, draft => {
                draft.count++;
            }),
        [DECREMENT]: (state, action) =>
            produce(state, draft => {
                draft.count--;
            }),
        [INC_SAGA]: (state, action) =>
            produce(state, draft => {
                draft.count += action.value;
            }),
        [DES_SAGA]: (state, action) =>
            produce(state, draft => {
                draft.count -= action.value;
            }),
    },
    initialState,
);
