import {Route, RouterModule, Routes} from '@angular/router';
import {TodoComponent} from './todo.component';
import {AuthGuardService} from '../core/auth-guard.service';
/**
 * Created by Administrator on 2017/7/17.
 */
export const routes: Routes = [
  {
    path: 'todo/:filter',
    canActivate: [AuthGuardService],
    component: TodoComponent
  }
];
export const routing = RouterModule.forChild(routes);
