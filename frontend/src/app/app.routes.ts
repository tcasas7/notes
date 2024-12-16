import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import { NotesFormComponent } from './components/notes-form/notes-form.component';
import { LoginComponent } from './login/login.component'; 
import { AuthGuard } from './auth.guard';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  {
    path: 'notes',
    component: NotesListComponent,
    canActivate: [AuthGuard], 
    data: { archived: false },
  },
  {
    path: 'notes/archived',
    component: NotesListComponent,
    canActivate: [AuthGuard],
    data: { archived: true },
  },
  {
    path: 'notes/new',
    component: NotesFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'notes/edit/:id',
    component: NotesFormComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
