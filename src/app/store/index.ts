import {ActionReducerMap, createFeatureSelector, createSelector, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import * as FromBoard from '../reducers/board.reducer';
import {boardFeatureKey, BoardState} from '../reducers/board.reducer';


export interface State {
  [FromBoard.boardFeatureKey]: FromBoard.BoardState;
}

export const reducers: ActionReducerMap<State> = {
  [FromBoard.boardFeatureKey]: FromBoard.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const selectFeature = createFeatureSelector<State, BoardState>(boardFeatureKey);
export const selectBoard = createSelector(
  selectFeature,
  state => state.boards
);


