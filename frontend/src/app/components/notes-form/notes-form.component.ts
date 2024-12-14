import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NotesService } from '../../services/notes.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notes-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './notes-form.component.html',
  styleUrls: ['./notes-form.component.css'],
})
export class NotesFormComponent implements OnInit {
  title: string = '';
  content: string = '';
  tags: string = '';
  isEditMode: boolean = false; 
  noteId: number | null = null; 

  constructor(
    private notesService: NotesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.noteId = +params['id'];
        this.loadNote(); 
      }
    });
  }

  loadNote(): void {
    if (this.noteId !== null) {
      this.notesService.getNoteById(this.noteId).subscribe(
        (note) => {
          
          this.title = note.title;
          this.content = note.content;
          this.tags = note.tags.map((tag: any) => tag.name).join(', ');
        },
        (error) => console.error('Error fetching note:', error)
      );
    }
  }

  saveNote(): void {
    const noteData = {
      title: this.title,
      content: this.content,
      tags: this.tags.split(',').map((tag) => tag.trim()),
    };

    if (this.isEditMode && this.noteId !== null) {
      
      this.notesService.updateNote(this.noteId, noteData).subscribe(
        () => {
          console.log('Note updated successfully!');
          this.router.navigate(['/notes']); 
        },
        (error) => console.error('Error updating note:', error)
      );
    } else {
     
      this.notesService.createNote(noteData).subscribe(
        () => {
          console.log('Note created successfully!');
          this.router.navigate(['/notes']); 
        },
        (error) => console.error('Error creating note:', error)
      );
    }
  }
}
