import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {createBoard, deleteBoard, loadBoards, loadBoardsFailure, loadBoardsSuccess, updateTask} from '../actions/board.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {of} from 'rxjs';


@Injectable()
export class BoardEffects {

  constructor(private actions$: Actions, private firebase: AngularFirestore) {
  }

  loadBoard$ = createEffect(() => this.actions$.pipe(
    ofType(loadBoards),
    mergeMap((action) => this.firebase.collection('boards', ref =>
      ref.where('uid', '==', action.uid).orderBy('priority')).valueChanges({idField: 'id'})
      .pipe(
        map(boards => loadBoardsSuccess({boards})),
        catchError(() => of(loadBoardsFailure))
      ))));

  createBoard$ = createEffect(() => this.actions$.pipe(
    ofType(createBoard),
    mergeMap((action) => this.firebase.collection('boards').add(action.board))),
    {dispatch: false});

  deleteBoard$ = createEffect(() => this.actions$.pipe(
    ofType(deleteBoard),
    mergeMap((action) => this.firebase.collection('boards').doc(action.boardId).delete())),
    {dispatch: false});

  updateTask$ = createEffect(() => this.actions$.pipe(
    ofType(updateTask),
    mergeMap((action) => this.firebase.collection('boards').doc(action.boardId).update({tasks: action.tasks}))),
    {dispatch: false});
}
