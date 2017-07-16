import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Todo} from './todo.model';
/**
 * Created by Administrator on 2017/7/15.
 */
export class InMemoryTodoService implements InMemoryDbService {
  createDb() {
   let todos: Todo[] = [
     {id: '1234456677788', desc: 'getting up', completed: true},
     {id: '1234450986556', desc: 'go to school', completed: false}
   ];
   return {todos};
  }

}
