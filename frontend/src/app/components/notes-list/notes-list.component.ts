import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NotesService } from '../../services/notes.service';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css'],
})
export class NotesListComponent implements OnInit {
  notes: { id:number; title: string; content: string; tags: { name: string }[] }[] = []; 
  uniqueTags: string[] = [];
  selectedTag: string = '';
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
        this.extractUniqueTags();
      },
      (error) => {
        console.error('Error fetching notes:', error);
      }
    );
  }
 
  extractUniqueTags(): void {
    const allTags = this.notes.flatMap((note) => note.tags.map((tag) => tag.name));
    this.uniqueTags = [...new Set(allTags)];
  }


  applyFilter(): void {
    if (this.selectedTag) {
      this.notes = this.notes.filter((note) =>
        note.tags.some((tag) => tag.name === this.selectedTag)
      );
    } else {
      this.loadNotes(); 
    }
  }

  archive(id: number): void {
    console.log('Archiving note with id:', id);
    this.notesService.archiveNote(id).subscribe(
      () => this.loadNotes(),
      (error) => console.error('Error archiving note:', error)
    );
  }

  delete(id: number): void {
    if (confirm('Are you sure you want to delete this note?')) {
      this.notesService.deleteNote(id).subscribe(
        () => this.loadNotes(),
        (error) => console.error('Error deleting note:', error)
      );
    }
  }
  

  unarchive(id: number): void {
    this.notesService.unarchiveNote(id).subscribe(
      () => this.loadNotes(),
      (error) => console.error('Error unarchiving note:', error)
    );
  }
}

