import {Route, RouterModule, Routes} from '@angular/router';
import {TodoComponent} from './todo.component';
/**
 * Created by Administrator on 2017/7/17.
 */
export const routes: Routes = [
  {
    path: 'todo',
    component: TodoComponent
  }
];
export const routing = RouterModule.forChild(routes);
