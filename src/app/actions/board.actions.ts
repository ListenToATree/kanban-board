import {createAction, props} from '@ngrx/store';
import {Board} from '../kanban/board.model';

export const loadBoards = createAction(
  '[Board] Load Boards',
  props<{ uid: string }>()
);

export const loadBoardsSuccess = createAction(
  '[Board] Load Boards Success',
  props<{ boards: Board[] }>()
);

export const loadBoardsFailure = createAction(
  '[Board] Load Boards Failure'
);

export const createBoard = createAction(
  '[Board] Create Board',
  props<{ board: Board }>()
);

export const deleteBoard = createAction(
  '[Board] delete Board',
  props<{ boardId: string }>()
);
