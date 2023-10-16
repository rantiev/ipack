import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs'
import { API_URL } from '../_shared/constants/global'
import { IThing } from '../_shared/entities/thing'

export interface IThingsRes {
  items: IThing[]
}

export interface ThingDTO extends Partial<IThing> {}

@Injectable({
  providedIn: 'root'
})
export class ThingsService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<IThing[]> {
    return this.http.get<IThingsRes>(`${API_URL}/things`).pipe(map((res) => res.items))
  }

  add(thing: ThingDTO): Observable<IThing> {
    return this.http.post<IThing>(`${API_URL}/things`, thing)
  }

  edit(thing: IThing): Observable<IThing> {
    return this.http.put<IThing>(`${API_URL}/things/${thing.id}`, thing)
  }

  remove(thing: IThing): Observable<IThing> {
    return this.http.delete<IThing>(`${API_URL}/things/${thing.id}`, {
      body: thing
    })
  }
}
