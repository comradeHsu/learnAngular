import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {AuthService} from './core/auth.service';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {TodoModule} from './todo/todo.module';
import {CoreModule} from './core/core.module';
import {AppRoutingModule} from './app-routing.module';
import {MdlModule} from 'angular2-mdl';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MdlModule,
    // InMemoryWebApiModule.forRoot(InMemoryTodoService),
    TodoModule,
    CoreModule,
    AppRoutingModule
  ],
  providers: [
    {provide: 'auth', useClass: AuthService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
