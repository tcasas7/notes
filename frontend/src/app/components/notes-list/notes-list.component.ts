import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NotesService } from '../../services/notes.service';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [CommonModule, RouterModule ],
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css'],
})
export class NotesListComponent implements OnInit {
  notes: any[] = []; 
  archived: boolean = false; 

  constructor(
    private notesService: NotesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.archived = data['archived'];
      this.loadNotes();
    })
  }

  loadNotes(): void {
    this.notesService.getNotes(this.archived).subscribe(
      (data) => {
        this.notes = data; 
      },
      (error) => {
        console.error('Error fetching notes:', error);
      }
    );
  }
 
  archive(id: number): void {
    console.log('Archiving note with id:', id);
    this.notesService.archiveNote(id).subscribe(
      () => this.loadNotes(),
      (error) => console.error('Error archiving note:', error)
    );
  }

  
  unarchive(id: number): void {
    this.notesService.unarchiveNote(id).subscribe(
      () => this.loadNotes(),
      (error) => console.error('Error unarchiving note:', error)
    );
  }
}

