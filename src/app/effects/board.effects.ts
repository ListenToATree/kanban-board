import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {
  createBoard,
  deleteBoard,
  loadBoards,
  loadBoardsFailure,
  loadBoardsSuccess,
  removeTask,
  sortBoards,
  updateEachBoard,
  updateTask
} from '../actions/board.actions';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {from, of} from 'rxjs';
import * as firebase from 'firebase/app';


@Injectable()
export class BoardEffects {

  constructor(private actions$: Actions, private fireStore: AngularFirestore) {
  }

  loadBoard$ = createEffect(() => this.actions$.pipe(
    ofType(loadBoards),
    mergeMap((action) => this.fireStore.collection('boards', ref =>
      ref.where('uid', '==', action.uid).orderBy('priority')).valueChanges({idField: 'id'})
      .pipe(
        map(boards => loadBoardsSuccess({boards})),
        catchError(() => of(loadBoardsFailure))
      ))));

  createBoard$ = createEffect(() => this.actions$.pipe(
    ofType(createBoard),
    mergeMap((action) => this.fireStore.collection('boards').add(action.board))),
    {dispatch: false});

  deleteBoard$ = createEffect(() => this.actions$.pipe(
    ofType(deleteBoard),
    mergeMap((action) => this.fireStore.collection('boards').doc(action.boardId).delete())),
    {dispatch: false});

  updateTask$ = createEffect(() => this.actions$.pipe(
    ofType(updateTask),
    mergeMap((action) => this.fireStore.collection('boards').doc(action.boardId).update({tasks: action.tasks}))),
    {dispatch: false});

  removeTask$ = createEffect(() => this.actions$.pipe(
    ofType(removeTask),
    mergeMap((action) => this.fireStore.collection('boards').doc(action.boardId).update(
      {tasks: firebase.firestore.FieldValue.arrayRemove(action.task)}))),
    {dispatch: false});


  batch = firebase.firestore().batch();

  sortBoards$ = createEffect(() => this.actions$.pipe(
    ofType(sortBoards),
    switchMap(({boards}) => {
      const newArray = [];
      boards.forEach((board, idx) => newArray[idx] = {boardId: board.id, idx});
      return from(newArray);
    }),
    map(({boardId, idx}) => updateEachBoard({boardId, idx}))));

  updateBoard$ = createEffect(() => this.actions$.pipe(
    ofType(updateEachBoard),
    mergeMap(({boardId, idx}) => this.fireStore.collection('boards').doc(boardId).update({priority: idx}))),
    {dispatch: false});
}
