import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatCheckbox } from '@angular/material/checkbox';


interface Todo {
  isChecked: boolean;
  todo: string;
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

  constructor() {
    this.todoList = [
      { isChecked: false, todo: "Todotask 1" },
      { isChecked: false, todo: "Todotask 2" },
      { isChecked: false, todo: "Todotask 3" },
      { isChecked: false, todo: "Todotask 4" },
    ];
    this.completedList = [
      { isChecked: true, todo: "Todotask 5" },
      { isChecked: true, todo: "Todotask 6" },
      { isChecked: true, todo: "Todotask 7" },
      { isChecked: true, todo: "Todotask 8" },
    ];
  }


  /** Method to add a new todo.
   * @param todoIndex - the index of the todo to add from completedList.
   * */
  add(todoIndex?: number): void {
    if (todoIndex != null) {
      this.completedList[todoIndex].isChecked = false;
      console.log(this.completedList[todoIndex]);
      this.todoList.push(this.completedList[todoIndex]);
      this.completedList.splice(todoIndex, 1);
      console.log(this.completedList);
    }
    else {
      this.todoList.push({ isChecked: false, todo: "newTodo" + (this.todoList.length + 1) });
      console.log("nopes");
    }
  }

  /** Method to set a todo status to complete.
   * @param todoIndex - the index of the todo to set as complete.
   * */
  complete(todoIndex: number): void {
    this.todoList[todoIndex].isChecked = true;
    this.completedList.push(this.todoList[todoIndex]);
    this.todoList.splice(todoIndex, 1);
  }


  /** Method to remove a todo from list.
   * @param isCompleted - if the todo is already completed (i.e belongs to the completedlist).
   * @param index - the index of the todo.
   **/
  remove(isCompleted: boolean, index: number) {
    if (isCompleted) {
      this.completedList.splice(index, 1);
      console.log(this.completedList);
    }
    else {
      this.todoList.splice(index, 1);
      console.log(this.todoList);
    }
  }

}
