import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">App Notes</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a
                class="nav-link"
                [routerLink]="['/notes']"
                routerLinkActive="active"
              >
                Active Notes
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                [routerLink]="['/notes/archived']"
                routerLinkActive="active"
              >
                Archived Notes
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                [routerLink]="['/notes/new']"
                routerLinkActive="active"
              >
                Create Note
              </a>
            </li>
          </ul>

          <button
            class="btn btn-outline-danger"
            (click)="logout()"
          >
            Logout
          </button> 
        </div>
      </div>
    </nav>
  `,
  styles: [
    `
      .navbar {
        margin-bottom: 20px;
      }
      .navbar-brand {
        font-size: 1.5rem;
        font-weight: bold;
      }
      .nav-link.active {
        font-weight: bold;
        color: #ffc107 !important; 
      }
      .nav-link {
        transition: color 0.3s;
      }
      .nav-link:hover {
        color: #ffc107 !important;
      }
    `,
  ],
})
export class HeaderComponent {

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token'); 
    this.router.navigate(['/login']); 
  }
}

  