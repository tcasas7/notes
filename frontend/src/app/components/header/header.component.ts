import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterModule],
    template: `
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Notas App</a>
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
                  Notas Activas
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  [routerLink]="['/notes/archived']"
                  routerLinkActive="active"
                >
                  Notas Archivadas
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  [routerLink]="['/notes/new']"
                  routerLinkActive="active"
                >
                  Crear Nota
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    `,
    styles: [],
  })
  
  export class HeaderComponent {}
  