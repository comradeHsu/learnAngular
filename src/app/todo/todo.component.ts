import {Component, Inject, OnInit} from '@angular/core';
import {Todo} from './todo.model';
import {TodoService} from './todo.service';

@Component({
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  desc: string = '';
  constructor(@Inject('todoService') private service) { }

  ngOnInit() {
  }
  addTodo() {
    this.service.addTodo(this.desc)
      .then(todo => {
          this.todos = [...this.todos, todo];
          this.desc = '';
      })
  }
  editTodo(todo: Todo) {
    const i = this.todos.indexOf(todo);
    this.service.eidtTodo(todo)
      .then(t => {
        this.todos = [
          ...this.todos.slice(0, i),
          t,
          ...this.todos.slice(i + 1)
        ];
      });
  }
  removeTodo(todo: Todo) {
    const i = this.todos.indexOf(todo);
    this.service.deletedTodo(todo.id)
      .then(() => {
      this.todos = [
        ...this.todos.slice(0, i),
        ...this.todos.slice(i + 1)
      ];
      });
  }
  getTodo() {
    this.service.getTodos()
      .then(todos => this.todos = [...todos]);
  }
  onTextChanges(value) {
    this.desc = value;
  }
}
