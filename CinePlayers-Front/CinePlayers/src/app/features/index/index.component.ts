import { Component } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  featuredMovies = [
    { image: 'https://files.meiobit.com/wp-content/uploads/2021/07/Guardians-Of-The-Galaxy.jpg', title: 'Movie 1' },
    { image: 'https://static.stealthelook.com.br/wp-content/uploads/2022/09/novos-filmes-que-eu-mal-posso-esperar-para-ver-esse-ano-avatar-the-way-of-the-water-20220908180112.jpg', title: 'Movie 2' },
    { image: 'https://lunetas.com.br/wp-content/uploads/2023/07/5-brincadeiras-inspiradas-em-filmes-para-fazer-com-as-criancas-portal-lunetas.jpg', title: 'Movie 3' },
    { image: 'https://upload.wikimedia.org/wikipedia/pt/2/2a/Deadpool_%26_Wolverine_cartaz.jpg', title: 'Movie 4' },
    { image: 'https://global.cdn.magazord.com.br/rosaazul/img/2022/06/blog/12125/os-incriveis-filme-infantil.jpg', title: 'Movie 5' },
    { image: 'https://www.oficinadanet.com.br/imagens/post/52914/esouro-azul.jpg', title: 'Movie 6' }
  ];

  mostLikedMovies = [
    { image: 'https://upload.wikimedia.org/wikipedia/pt/2/2a/Deadpool_%26_Wolverine_cartaz.jpg', title: 'Movie 7' },
    { image: 'https://files.meiobit.com/wp-content/uploads/2021/07/Guardians-Of-The-Galaxy.jpg', title: 'Movie 8' },
    { image: 'https://global.cdn.magazord.com.br/rosaazul/img/2022/06/blog/12125/os-incriveis-filme-infantil.jpg', title: 'Movie 9' },
    { image: 'https://www.oficinadanet.com.br/imagens/post/52914/esouro-azul.jpg', title: 'Movie 10' },
    { image: 'https://lunetas.com.br/wp-content/uploads/2023/07/5-brincadeiras-inspiradas-em-filmes-para-fazer-com-as-criancas-portal-lunetas.jpg', title: 'Movie 11' },
    { image: 'https://static.stealthelook.com.br/wp-content/uploads/2022/09/novos-filmes-que-eu-mal-posso-esperar-para-ver-esse-ano-avatar-the-way-of-the-water-20220908180112.jpg', title: 'Movie 12' }
  ];

  latestReleases = [
    { image: 'https://upload.wikimedia.org/wikipedia/pt/2/2a/Deadpool_%26_Wolverine_cartaz.jpg', title: 'Movie 13' },
    { image: 'https://global.cdn.magazord.com.br/rosaazul/img/2022/06/blog/12125/os-incriveis-filme-infantil.jpg', title: 'Movie 14' },
    { image: 'https://files.meiobit.com/wp-content/uploads/2021/07/Guardians-Of-The-Galaxy.jpg', title: 'Movie 15' },
    { image: 'https://static.stealthelook.com.br/wp-content/uploads/2022/09/novos-filmes-que-eu-mal-posso-esperar-para-ver-esse-ano-avatar-the-way-of-the-water-20220908180112.jpg', title: 'Movie 16' },
    { image: 'https://lunetas.com.br/wp-content/uploads/2023/07/5-brincadeiras-inspiradas-em-filmes-para-fazer-com-as-criancas-portal-lunetas.jpg', title: 'Movie 17' },
    { image: 'https://www.oficinadanet.com.br/imagens/post/52914/esouro-azul.jpg', title: 'Movie 18' }
  ];

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
}
