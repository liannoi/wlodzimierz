import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { User } from '../models/user.model';
import { JwtToken } from '../models/jwt-token.model';

@Injectable()
export class UsersService {
  public constructor(private http: HttpClient) {
  }

  public signIn(user: User): Observable<JwtToken> {
    return this.http.post<JwtToken>('https://localhost:5001/api/users/signup', user);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public writeToken(token:JwtToken,date: Date){

  }
}
