import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [CommonModule, FormsModule,], 
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/notes']);
      },
      error: (err) => {
        alert('Login failed: ' + err.error.message);
      },
    });
  }
}
