import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddEditTodoDialogComponent } from '../add-edit-todo-dialog/add-edit-todo-dialog.component';
import { UserStorageService } from '../../services/user-storage.service';


export interface Todo {
  isChecked: boolean;
  todo: string;
}

enum todoList {
  Todo = "todoList",
  Completed = "completedList"
}

@Component({
  selector: 'app-todo-list',
  standalone: true,
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
  imports: [
    CommonModule,
    MatDividerModule,
    MatButtonModule,
    MatIcon,
    MatTableModule,
    MatListModule,
    MatCheckbox,
  ],
})
export class TodoListComponent {

  todoList!: Array<Todo>;
  completedList!: Array<Todo>;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private userStorage: UserStorageService
  ) {
    this.todoList = this.userStorage.getTodoList(todoList.Todo) ?? [];
    this.completedList = this.userStorage.getTodoList(todoList.Completed) ?? [];
  }


  /** Method to add a new todo.
   * @param todoIndex - the index of the todo to add from completedList.
   * */
  add(todoIndex?: number): void {
    if (todoIndex != null) {
      this.completedList[todoIndex].isChecked = false;
      this.todoList.push(this.completedList[todoIndex]);
      this.completedList.splice(todoIndex, 1);
      this.updateStorage();
    }
    else {
      let dialogRef = this.dialog.open(AddEditTodoDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {

          if (result.length > 0) {
            this.todoList.push({ isChecked: false, todo: result });
            this.updateStorage();
          } else {
            this.snackBar.open("Cannot Create Todo  :-(", "Close", {
              duration: 1750
            })
          }
        }
      });
    }
  }


  /** Method to set a todo status to complete.
   * @param todoIndex - the index of the todo to set as complete.
   * */
  complete(todoIndex: number): void {
    this.todoList[todoIndex].isChecked = true;
    this.completedList.push(this.todoList[todoIndex]);
    this.todoList.splice(todoIndex, 1);
    this.updateStorage();
  }


  /** Method to remove a todo from list.
   * @param isCompleted - if the todo is already completed (i.e belongs to the completedlist).
   * @param index - the index of the todo.
   **/
  remove(isCompleted: boolean, index: number) {
    if (isCompleted) {
      this.completedList.splice(index, 1);
    }
    else {
      this.todoList.splice(index, 1);
    }
    this.updateStorage();
  }


  /** Update the localStorage to contain the latest todoLists */
  updateStorage(): void {
    this.userStorage.setTodoList(todoList.Todo, this.todoList);
    this.userStorage.setTodoList(todoList.Completed, this.completedList);
  }
}
