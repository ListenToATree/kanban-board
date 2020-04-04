import { createAction, props } from '@ngrx/store';

export const loadBoards = createAction(
  '[Board] Load Boards'
);

export const loadBoardsSuccess = createAction(
  '[Board] Load Boards Success',
  props<{ data: any }>()
);

export const loadBoardsFailure = createAction(
  '[Board] Load Boards Failure',
  props<{ error: any }>()
);
