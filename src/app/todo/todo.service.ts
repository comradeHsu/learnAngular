import { Injectable } from '@angular/core';
import {UUID} from 'angular2-uuid';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Todo} from '../domain/entities';

@Injectable()
export class TodoService {
 // private api_url = 'api/todos';
  private api_url = 'http://localhost:3000/todos';
  private headers = new Headers({'Content-Type': 'application/json'});
  todos: Todo[]= [];
  constructor(private http: Http) { }
  // #post
  addTodo(desc: string): Promise<Todo> {
    const userId: number = +localStorage.getItem('userId');
    let todo = {
      id: UUID.UUID(),
      desc: desc,
      completed: false,
      userId
    };
    return this.http
      .post(this.api_url, JSON.stringify(todo), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as Todo)
      .catch(this.handleError);
  }

  // put
  toggleTodo(todo: Todo): Promise<Todo> {
    const url = `${this.api_url}/${todo.id}`;
    console.log(url);
    let updatedTodo = Object.assign({}, todo, {completed: !todo.completed});//assign(target,..source)将源对象的属性复制到目标对象
    return this.http
      .put(url, JSON.stringify(updatedTodo), {headers: this.headers})
      .toPromise()
      .then(() => updatedTodo)
      .catch(this.handleError);
  }

  //delete
  deletedTodo(id: string): Promise<void> {
    const url = `${this.api_url}/${id}`;
    return this.http
      .delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  //get
  getTodos(): Promise<Todo[]> {
    const userId: number = +localStorage.getItem('userId');
    const url: string = `${this.api_url}?userId=${userId}`;
    return this.http
      .get(url)
      .toPromise()
      .then(res => res.json() as Todo[])
      .catch(this.handleError);
  }
  filterTodos(filter: string): Promise<Todo[]> {
    const userId: number = +localStorage.getItem('userId');
    switch (filter) {
      case 'ACTIVE': return this.http
        .get(`${this.api_url}?completed=false&userId=${userId}`)
        .toPromise()
        .then(res => res.json() as Todo[])
        .catch(this.handleError);
      case 'COMPLETED': return this.http
        .get(`${this.api_url}?completed=true&userId=${userId}`)
        .toPromise()
        .then(res => res.json() as Todo[])
        .catch(this.handleError);
      default:
        return this.getTodos();
    }
  }
  private handleError(error: any): Promise<any> {
    console.error('an error :', error);
    return Promise.reject(error.message || error);
  }
}
