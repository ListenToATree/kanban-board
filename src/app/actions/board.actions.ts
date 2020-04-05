import {createAction, props} from '@ngrx/store';
import {Board, Task} from '../kanban/board.model';

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
  '[Board] Delete Board',
  props<{ boardId: string }>()
);

export const updateTask = createAction(
  '[Task] Update Task',
  props<{ boardId: string, tasks: Task[] }>()
);

export const removeTask = createAction(
  '[Task] Remove Task',
  props<{ boardId: string, task: Task }>()
);

export const sortBoards = createAction(
  '[Board] Sort Boards',
  props<{ boards: Board[] }>()
);

export const updateEachBoard = createAction(
  '[Board] Update Each Board',
  props<{ boardId: string, idx: number }>()
);
