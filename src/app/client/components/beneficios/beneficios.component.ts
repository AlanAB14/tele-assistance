import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { SwiperContainer, register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-beneficios',
  standalone: true,
  imports: [
    CommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `

  <div class="beneficios" #beneficios>
    <div class="beneficios__text">
      <p>Beneficios de tercerizar tus operaciones en nuestro Contact Center</p>
    </div>
    <div class="beneficios__cards">
      <swiper-container autoplay-delay="2500" loop="true" autoplay-disable-on-interaction="false" [slidesPerView]="slidesPerView">
      @for (item of cards; track $index) {
          <swiper-slide>
            <div class="card">
              <div class="icon">
                <img [src]="item.img" alt="img">
              </div>
              <div class="title">
                <p>{{ item.title }}</p>
              </div>
              <div class="text">
                <div [innerHTML]="item.text"></div>
              </div>
            </div>
          </swiper-slide>
        }
      </swiper-container>
      </div>
    </div>

  `,
  styleUrl: './beneficios.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BeneficiosComponent implements AfterViewInit, OnInit {
  cards: any[] = [
    {
      img: 'assets/imgs/beneficios/rrhh.svg',
      title: 'Recursos Humanos',
      text: 'Contamos con un equipo humano altamente capacitado, comprometido y con baja rotación. <br> MENOR ROTACIÓN = MAYOR EXPERIENCIA = MEJOR ATENCIÓN.'
    },
    {
      img: 'assets/imgs/beneficios/tecnologia.svg',
      title: 'Tecnología',
      text: 'Uno de nuestros mayores diferenciales es contar con un departamento de desarrollo tecnológico propio. La autonomía tecnológica se refleja en un servicio más rápido, confiable y a medida.'
    },
    {
      img: 'assets/imgs/beneficios/practicas.svg',
      title: 'Mejores Prácticas',
      text: 'En Tele Assistance trabajamos bajo un enfoque de gestión por procesos alineado a normas ISO. Estas buenas prácticas nos permiten ofrecer un servicio eficiente, responsable y comprometido con el entorno.'
    },
    {
      img: 'assets/imgs/beneficios/cobros.svg',
      title: 'Cobros Electrónicos',
      text: 'Ofrecemos diversas formas de pago electrónico, pensadas para brindar comodidad, agilidad y seguridad. <ul><li>Tarjetas de crédito y débito.</li><li>Débito automático y transferencias.</li><li>Códigos QR.</li><li>Facturación electrónica y comprobantes automáticos.</li> </ul>'
    }
  ]

  slidesPerView: number = 4;
  screenWidth!: number;

  @ViewChild('beneficios') beneficios!: ElementRef;
  constructor(private elementRef: ElementRef, @Inject(PLATFORM_ID) private platformId: Object, private cdf: ChangeDetectorRef) { }

  @HostListener('window:resize', ['$event'])
  getScreenWidth() {
    this.screenWidth = window.innerWidth;
    this.setSlides()
  }

  ngOnInit(): void {
    this.setSlides()
  }

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

  setSlides() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth > 1560) {
      this.slidesPerView = 4
    }

    if (this.screenWidth < 1560) {
      this.slidesPerView = 3
    }

    if (this.screenWidth < 1230) {
      this.slidesPerView = 2
    }

    if (this.screenWidth < 900) {
      this.slidesPerView = 1
    }

    this.cdf.detectChanges()
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
