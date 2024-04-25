import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-beneficios',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  
  <div class="beneficios" #beneficios>
    <div class="beneficios__text">
      <p>Beneficios de tercerizar tus operaciones en nuestro Contact Center</p>
    </div>
    <div class="beneficios__cards">
      @for (item of cards; track $index) {
        <div class="card">
          <div class="icon">
            <img [src]="item.img" alt="img">
          </div>
          <div class="title">
            <p>{{ item.title }}</p>
          </div>
          <div class="text">
            <p>{{ item.text }}</p>
          </div>
        </div>
      }
    </div>
  </div>
  
  `,
  styleUrl: './beneficios.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeneficiosComponent implements AfterViewInit {
  cards: any[] = [
    {
      img: 'assets/imgs/beneficios/rrhh.svg',
      title: 'Recursos Humanos',
      text: 'Contamos con personal expertoen atención telefónica,altamente capacitado y bilingüe.'
    },
    {
      img: 'assets/imgs/beneficios/tecnologia.svg',
      title: 'Tecnología',
      text: 'Contamos con la másavanzada tecnología para garantizarla efectividad de nuestro trabajo.'
    },
    {
      img: 'assets/imgs/beneficios/practicas.svg',
      title: 'Mejoras Prácticas',
      text: 'Nuestras prácticas y profesionales se caracterizanpor la eficacia y el poderde resolución.'
    },
    {
      img: 'assets/imgs/beneficios/cobros.svg',
      title: 'Cobros Electrónicos',
      text: 'Contamos con mediosde cobros electrónicos,para comodidad denuestros clientes.'
    }
  ]

  @ViewChild('beneficios') beneficios!: ElementRef;
  constructor(private elementRef: ElementRef, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const images = this.elementRef.nativeElement.querySelectorAll('img');
      let imagesLoaded = 0;

      const checkImagesLoaded = () => {
        imagesLoaded++;
        if (imagesLoaded === images.length) {
          this.initAnimation();
        }
      };

      images.forEach((img: HTMLImageElement) => {
        if (img.complete) {
          checkImagesLoaded();
        } else {
          img.addEventListener('load', checkImagesLoaded);
        }
      });
    }
  }

  initAnimation(): void {
    gsap.registerPlugin(ScrollTrigger);
    const cards = this.elementRef.nativeElement.querySelectorAll('.card');

    cards.forEach((card: HTMLElement, index: number) => {
      gsap.to(card, {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".beneficios__cards",
          start: "top center", // Comienza la animación cuando el 80% superior del elemento es visible
          end: "bottom center", // Termina la animación cuando el 20% inferior del elemento es visible
          // scrub: true, // Hace que la animación se sincronice con el desplazamiento
        },
        delay: index * 0.2 // Aplica un retraso incremental
      });
    });
  }
}
