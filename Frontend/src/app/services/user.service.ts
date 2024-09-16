import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../entities/user-entity';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private api = '/api/users';
  constructor(private http: HttpClient) {}

  userList(): Observable<User[]> {
    return this.http.get<User[]>(this.api);
  }

  findUserById(idUser: string): Observable<User> {
    const singleUser = `${this.api}/${idUser}`;
    return this.http.get<User>(idUser);
  }
}