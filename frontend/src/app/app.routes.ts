import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import { NotesFormComponent } from './components/notes-form/notes-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'notes', pathMatch: 'full' },
  { path: 'notes', component: NotesListComponent, data: { archived: false} },
  { path: 'notes/archived', component: NotesListComponent, data: { archived: true } },
  { path: 'notes/new', component: NotesFormComponent,},
  { path: 'notes/edit/:id', component: NotesFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

