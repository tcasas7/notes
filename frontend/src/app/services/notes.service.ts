import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private apiUrl = 'http://localhost:3000/notes';

  constructor(private http: HttpClient) {}

  getNotes(archived: boolean = false): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?archived=${archived}`);
  }
  
  createNote(note: any): Observable<any> {
    return this.http.post(this.apiUrl, note);
  }

  updateNote(id: number, note: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, note);
  }

  deleteNote(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  archiveNote(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/archive`, {});
  }

  getNoteById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  
  unarchiveNote(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/unarchive`, {});
  }
}
