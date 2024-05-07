import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, ViewChild, signal } from '@angular/core';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { SwiperContainer, register } from 'swiper/element/bundle';
import { SwiperOptions } from 'swiper/types';
register();

@Component({
  selector: 'app-instalaciones',
  standalone: true,
  imports: [
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
  
    <div class="instalaciones__section" #instalaciones>
      <div class="instalaciones__section__header">
        <div class="title">
          <h1>Nuestras Instalaciones</h1>
          <p>Contamos con modernas instalaciones, ampliamente desarrolladas para la comodidad tanto de clientes como operadores.</p>
        </div>
        <div class="link">
          <p>Conocé más</p>
          <img src="assets/imgs/arrow-right.svg" alt="arrow">
        </div>
      </div>
      <div class="instalaciones__section__images" >
        <swiper-container class="swp" autoplay-delay="2500" autoplay-disable-on-interaction="false" [slidesPerView]="slidesPerView">
          @for (item of images; track $index) {
            <swiper-slide>
              <img class="images-instalaciones" [src]="item.img" alt="instalaciones-1">
            </swiper-slide>
          }
        </swiper-container>
      </div>
      <div class="instalaciones__section__icon">
        <img class="images-instalaciones-logo" src="assets/imgs/instalaciones/instalaciones-logo.svg" alt="logo">
      </div>
    </div>

  `,
  styleUrl: './instalaciones.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstalacionesComponent implements AfterViewInit, OnInit {
  swiperElement = signal<SwiperContainer | null>(null);
  slidesPerView: number = 3;
  screenWidth!: number;
  images: any[] = [
    {
      img: "assets/imgs/instalaciones/instalaciones-1.png"
    },
    {
      img: "assets/imgs/instalaciones/instalaciones-2.png"
    },
    {
      img: "assets/imgs/instalaciones/instalaciones-3.png"
    }
  ]

  @ViewChild('instalaciones') instalaciones!: ElementRef;

  constructor(private elementRef: ElementRef, @Inject(PLATFORM_ID) private platformId: Object, private cdf: ChangeDetectorRef) { }

  @HostListener('window:resize', ['$event'])
  getScreenWidth(){
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
    if (this.screenWidth > 1300) {
      this.slidesPerView = 3
    }

    if (this.screenWidth < 1300) {
      this.slidesPerView = 2
    }
    this.cdf.detectChanges()
  }

  initAnimation(): void {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to([".images-instalaciones", ".images-instalaciones-logo"], {
      opacity: 1,
      y: 0,
      duration: .7,
      scrollTrigger: {
        trigger: ".instalaciones__section__header",
        start: "top center", // Comienza la animación cuando el 80% superior del elemento es visible
        end: "bottom center", // Termina la animación cuando el 20% inferior del elemento es visible
        // scrub: true, // Hace que la animación se sincronice con el desplazamiento
      }
    });
  }
}