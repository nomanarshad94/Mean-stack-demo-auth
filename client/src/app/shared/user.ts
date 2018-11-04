
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { delay } from 'rxjs/operators';


export class User{
    email: string;
    name: string;
    login: boolean;
    constructor(){}
    Islogin(): Observable<boolean> {
        return of(this.login).pipe(delay(2000));
      }
}