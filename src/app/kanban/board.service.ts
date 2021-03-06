import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Board, Task} from './board.model';
import {switchMap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {createBoard, deleteBoard, loadBoards, removeTask, updateTask, sortBoards} from '../actions/board.actions';
import {Observable} from 'rxjs';
import {selectBoard, State} from '../store';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private store: Store<State>) {
  }

  /**
   * Creates a new board for the current user
   */
  createBoard(data: Board) {
    const user = this.afAuth.auth.currentUser;
    this.store.dispatch(createBoard(
      {
        board: {
          ...data, uid: user.uid,
          tasks: [{description: 'Hello!', label: 'yellow'}]
        }
      }));
  }

  /**
   * Delete board
   */
  deleteBoard(boardId: string) {
    this.store.dispatch(deleteBoard({boardId}));
  }

  /**
   * Updates the tasks on board
   */
  updateTasks(boardId: string, tasks: Task[]) {
    this.store.dispatch(updateTask({boardId, tasks}));
  }

  /**
   * Remove a specifc task from the board
   */
  removeTask(boardId: string, task: Task) {
    this.store.dispatch(removeTask({boardId, task}));
  }

  /**
   * Get all boards owned by current user
   */
  getUserBoards(): Observable<Board[]> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.store.dispatch(loadBoards({uid: user.uid}));
          return this.store.select(selectBoard);
        } else {
          return [];
        }
      })
    );
  }

  /**
   * Run a batch write to change the priority of each board for sorting
   */
  sortBoards(boards: Board[]) {
    this.store.dispatch(sortBoards({boards}));
  }

}
