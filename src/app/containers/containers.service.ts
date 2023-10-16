import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs'
import { API_URL_CONTAINERS } from '../_shared/constants/global'
import { IContainer } from '../_shared/entities/container'

export interface IContainersRes {
  items: IContainer[]
}

export interface ContainerDTO extends Partial<IContainer> {}

@Injectable({
  providedIn: 'root'
})
export class ContainersService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<IContainer[]> {
    return this.http.get<IContainersRes>(`${API_URL_CONTAINERS}`).pipe(map((res) => res.items))
  }

  add(container: ContainerDTO): Observable<IContainer> {
    return this.http.post<IContainer>(`${API_URL_CONTAINERS}`, container)
  }

  edit(container: IContainer): Observable<IContainer> {
    return this.http.put<IContainer>(`${API_URL_CONTAINERS}/${container.id}`, container)
  }

  remove(container: IContainer): Observable<IContainer> {
    return this.http.delete<IContainer>(`${API_URL_CONTAINERS}/${container.id}`, {
      body: container
    })
  }
}
