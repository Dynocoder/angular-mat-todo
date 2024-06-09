import { Injectable } from '@angular/core';
import { Todo } from '../components/todo-list/todo-list.component';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {

  constructor() {
  }

  /** Getter for todoList
   * @param todoType - the type of todo to get (todo, pending).
   * */
  getTodoList(todoType: string): Todo[] | null {
    let list = localStorage.getItem(todoType);
    return list ? JSON.parse(list) as Todo[] : null;
  }

  /** Setter for todoList
   * @param todoType - the type of todo to set (todo, pending).
   * @param value
   * */
  setTodoList<T>(todoType: string, value: Todo[]) {
    localStorage.setItem(todoType, JSON.stringify(value));
  }

}
