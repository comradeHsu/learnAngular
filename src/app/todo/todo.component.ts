import {Component, Inject, OnInit} from '@angular/core';

import {TodoService} from './todo.service';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {Todo} from '../domain/entities';

@Component({
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  desc: string = '';
  constructor(@Inject('todoService') private service,
  private route: ActivatedRoute ,
  private router: Router) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let filter = params['filter'];
      this.filterTodos(filter);
    });
  }
  addTodo() {
    this.service.addTodo(this.desc)
      .then(todo => {
          this.todos = [...this.todos, todo];
          this.desc = '';
      })
  }
  toggleTodo(todo: Todo): Promise<void> {
    const i = this.todos.indexOf(todo);
    return this.service.toggleTodo(todo)
      .then(t => {
        this.todos = [
          ...this.todos.slice(0, i),
          t,
          ...this.todos.slice(i + 1)
        ];
        return null;
      });
  }
  removeTodo(todo: Todo): Promise<void> {
    const i = this.todos.indexOf(todo);
    return this.service.deletedTodo(todo.id)
      .then(() => {
      this.todos = [
        ...this.todos.slice(0, i),
        ...this.todos.slice(i + 1)
      ];
      return null;
      });
  }
  getTodo() {
    this.service.getTodos()
      .then(todos => this.todos = [...todos]);
  }
  filterTodos(filter: string): void {
    this.service
      .filterTodos(filter)
      .then(todos => this.todos = [...todos]);
  }
  toggleAll() {
    this.todos.forEach(todo => this.toggleTodo(todo));
  }
  clearCompleted() {
    const completed_todos = this.todos.filter(todo => todo.completed === true);
    const active_todos = this.todos.filter(todo => todo.completed === false);
    Promise.all(completed_todos.map(todo => this.service.deletedTodo(todo.id)))
      .then(() => this.todos = [...active_todos]);
  }
  onTextChanges(value) {
    this.desc = value;
  }
}
