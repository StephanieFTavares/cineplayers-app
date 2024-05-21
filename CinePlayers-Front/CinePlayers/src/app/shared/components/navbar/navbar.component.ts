import { Component, Renderer2 } from '@angular/core';
import { SearchService } from 'src/app/core/services/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  searchTerm: string = '';
  isDarkTheme: boolean = true;

  constructor(private searchService: SearchService, private renderer: Renderer2) {
    this.updateTheme();
  }

  onSearch() {
    this.searchService.updateSearchTerm(this.searchTerm);
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.updateTheme();
  }

  updateTheme() {
    if (this.isDarkTheme) {
      this.renderer.setAttribute(document.body, 'cds-theme', 'dark');
    } else {
      this.renderer.setAttribute(document.body, 'cds-theme', 'light');
    }
  }
}
