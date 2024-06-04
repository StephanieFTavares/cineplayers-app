import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { SearchService } from 'src/app/core/services/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  searchTerm: string = '';
  isDarkTheme: boolean = true;

  constructor(
    private searchService: SearchService,
    private renderer: Renderer2,
    private authService: AuthService,
    private router: Router) {
    this.loadTheme();  // Carrega o tema ao inicializar
  }

  ngOnInit(): void {
    this.updateTheme();  // Atualiza o tema com base na preferência carregada
  }

  onSearch() {
    this.searchService.updateSearchTerm(this.searchTerm);
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.updateTheme();
  }

  updateTheme() {
    const theme = this.isDarkTheme ? 'dark' : 'light';
    this.renderer.setAttribute(document.body, 'cds-theme', theme);
    localStorage.setItem('theme', theme);
  }

  loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkTheme = savedTheme === 'dark';
    } else {
      this.isDarkTheme = true; // Default to dark theme
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
