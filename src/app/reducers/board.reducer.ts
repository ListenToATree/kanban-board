import {Action, createReducer, on} from '@ngrx/store';
import {Board} from '../kanban/board.model';
import {loadBoardsFailure, loadBoardsSuccess} from '../actions/board.actions';


export const boardFeatureKey = 'boards';


export interface BoardState {
  boards: Board[];
}

export const initialState: BoardState = {
  boards: []
};

const boardReducer = createReducer(
  initialState,
  on(loadBoardsSuccess, ((state, {boards}) => ({...state, boards}))),
  on(loadBoardsFailure, ((state) => ({...state, boards: []})))
);

export function reducer(state: BoardState | undefined, action: Action) {
  return boardReducer(state, action);
}
