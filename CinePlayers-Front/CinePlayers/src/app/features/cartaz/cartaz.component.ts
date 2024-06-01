import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Filme } from 'src/app/core/models/filme.model';
import { FilmeService } from 'src/app/core/services/filme.service';

@Component({
  selector: 'app-cartaz',
  templateUrl: './cartaz.component.html',
  styleUrls: ['./cartaz.component.css']
})
export class CartazComponent {
  movies: Filme[] = [];

  constructor(private filmeService: FilmeService, private router: Router) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  ngAfterViewInit(): void {
    this.updateCarouselWidths();
    window.addEventListener('resize', this.updateCarouselWidths);
  }

  loadMovies(): void {
    this.filmeService.getFilmesEmCartaz().subscribe(
      (response) => {
        this.movies = response;
        setTimeout(() => this.updateCarouselWidths(), 0); // Update carousel widths after movies are loaded
      },
      (error) => {
        console.error('Erro ao carregar filmes em cartaz', error);
      }
    );
  }

  updateCarouselWidths = (): void => {
    const carousels = document.querySelectorAll('.carousel-inner');
    carousels.forEach(carousel => {
      const itemWidth = carousel.clientWidth / 5;
      carousel.querySelectorAll('.carousel-item').forEach(item => {
        (item as HTMLElement).style.width = `${itemWidth}px`;
      });
    });
  }

  prevSlide(carouselId: string): void {
    const carousel = document.getElementById(carouselId);
    if (carousel) {
      const inner = carousel.querySelector('.carousel-inner');
      if (inner) {
        inner.scrollBy({ left: -inner.clientWidth / 5, behavior: 'smooth' });
      }
    }
  }

  nextSlide(carouselId: string): void {
    const carousel = document.getElementById(carouselId);
    if (carousel) {
      const inner = carousel.querySelector('.carousel-inner');
      if (inner) {
        inner.scrollBy({ left: inner.clientWidth / 5, behavior: 'smooth' });
      }
    }
  }

  goToDetails(nome: string | undefined): void {
    if (nome) {
      this.router.navigate(['/filme', nome]);
    }
  }
}
