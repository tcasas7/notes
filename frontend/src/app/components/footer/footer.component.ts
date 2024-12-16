import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-footer',
    standalone: true,
    template: `
      <footer class="footer">
        <div class="container">
          <p>
            © 2024 Notes App. All rights reserved.
            <br />
            Developed with <span style="color: red;">❤</span> by Tomas Casas for Ensolvers.
          </p>
          <div class="social-icons">
            <a
              href="https://www.linkedin.com/in/tomas-casas-ba5233233"
              target="_blank"
              rel="noopener noreferrer"
              class="me-3"
            >
              <i class="fab fa-linkedin fa-2x"></i>
            </a>
            <a
              href="https://github.com/tcasas7"
              target="_blank"
              rel="noopener noreferrer"
              class="me-3"
            >
              <i class="fab fa-github fa-2x"></i>
            </a>
          </div>
        </div>
      </footer>
    `,
    styles: [
      `
        .footer {
          position: relative;
          bottom: 0;
          width: 100%;
          background-color: #343a40;
          color: white;
          text-align: center;
          padding: 1rem 0;
        }
        .social-icons {
          margin-top: 15px;
        }
        .social-icons a {
          color: white;
          margin: 0 15px; /* Incrementa el espacio horizontal */
          text-decoration: none;
        }
        .social-icons a:hover {
          color: #007bff;
        }
      `,
    ],
  })
  export class FooterComponent {}