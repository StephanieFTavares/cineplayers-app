import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Filme } from 'src/app/core/models/filme.model';
import { FilmeService } from 'src/app/core/services/filme.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  featuredMovies: Filme[] = [];
  mostLikedMovies: Filme[] = [];
  latestReleases: Filme[] = [];

  constructor(private filmeService: FilmeService, private router: Router) {}

  ngOnInit() {
    this.filmeService.getFilmesDestaque().subscribe((filmes: Filme[]) => {
      this.featuredMovies = filmes;
    });

    this.filmeService.getFilmesMaisCurtidos().subscribe((filmes: Filme[]) => {
      this.mostLikedMovies = filmes;
    });

    this.filmeService.getLancamentos().subscribe((filmes: Filme[]) => {
      this.latestReleases = filmes;
    });
  }

  ngAfterViewInit() {
    this.updateCarouselWidths();
    window.addEventListener('resize', this.updateCarouselWidths);
  }

  updateCarouselWidths = () => {
    const carousels = document.querySelectorAll('.carousel-inner');
    carousels.forEach(carousel => {
      const itemWidth = carousel.clientWidth / 5;
      carousel.querySelectorAll('.carousel-item').forEach(item => {
        (item as HTMLElement).style.width = `${itemWidth}px`;
      });
    });
  }

  prevSlide(carouselId: string) {
    const carousel = document.getElementById(carouselId);
    if (carousel) {
      const inner = carousel.querySelector('.carousel-inner');
      if (inner) {
        inner.scrollBy({ left: -inner.clientWidth / 5, behavior: 'smooth' });
      }
    }
  }

  nextSlide(carouselId: string) {
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
