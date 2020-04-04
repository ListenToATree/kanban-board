import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import {Board} from '../kanban/board.model';
import * as FromBoard from '../reducers/board.reducer';


export interface State {
  [FromBoard.boardFeatureKey]: FromBoard.BoardState;
}

export const reducers: ActionReducerMap<State> = {
  [FromBoard.boardFeatureKey]: FromBoard.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
