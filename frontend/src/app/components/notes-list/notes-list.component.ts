import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css'],
})
export class NotesListComponent implements OnInit {
  notes: any[] = []; 

  constructor(private http: HttpClient) {}

  ngOnInit() {
    
    this.http.get<any[]>('http://localhost:3000/notes').subscribe(
      (data) => {
        this.notes = data; 
      },
      (error) => {
        console.error('Error fetching notes:', error);
      }
    );
  }
}
