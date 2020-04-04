import {Action, createReducer, on} from '@ngrx/store';
import {State} from '../store';
import {Board} from '../kanban/board.model';


export const boardFeatureKey = 'boards';


export interface BoardState {
  boards: Board[];
}

export const initialState: BoardState = {
  boards: []
};

const boardReducer = createReducer(
  initialState,
);

export function reducer(state: BoardState | undefined, action: Action) {
  return boardReducer(state, action);
}
