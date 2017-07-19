/**
 * Created by Administrator on 2017/7/19.
 */
export class Todo {
  id: string;
  desc: string;
  completed: boolean;
  userId: number;
}
export class User {
  id: number;
  username: string;
  password: string
}
export class Auth {
  user: User;
  hasError: boolean;
  errMsg: string;
  redirectUrl: string;
}
