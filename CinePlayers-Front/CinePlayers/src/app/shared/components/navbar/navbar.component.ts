import { Component } from '@angular/core';
import { SearchService } from 'src/app/core/services/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  searchTerm: string = '';

  constructor(private searchService: SearchService) {}

  onSearch() {
    this.searchService.updateSearchTerm(this.searchTerm);
  }
}
