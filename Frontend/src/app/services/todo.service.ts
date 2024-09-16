import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../entities/todo-entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private api = "/api/todos";
  constructor(private http: HttpClient) { }

  Find(includedCompleted: boolean): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.api, {params: {completed: includedCompleted.toString()}});
  }

  add(item: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.api, item);
  }

  check(id: string): Observable<Todo> {
    return this.http.patch<Todo>(`${this.api}/${id}/check`, null);
  }

  uncheck(id: string): Observable<Todo> {
    return this.http.patch<Todo>(`${this.api}/${id}/uncheck`, null);
  }

  assign(todoId: string, userId: string): Observable<Todo> {
    return this.http.post<Todo>(`${this.api}/${todoId}/assign`, { userId });
  }
  
}
