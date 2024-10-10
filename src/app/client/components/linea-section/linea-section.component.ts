import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, ElementRef, HostListener, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SwiperContainer, register } from 'swiper/element/bundle';
import { SwiperOptions } from 'swiper/types';
register();

@Component({
  selector: 'app-linea-section',
  standalone: true,
  imports: [
    CommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
  <div class="linea-section">
    <div class="linea-section__title">
      <div class="title">
        <div>En línea</div>
        <div><span>con lo que necesitás</span></div>
      </div>
      
      <div class="subtitle">
        <p>Tele Assistance es un servicio de asistencia disponible las <span>24 hs, los 365 días del año.</span></p>
      </div>

      <div class="certification">
        <p>Certificación de Calidad</p>
        <img src="assets/imgs/certificacion-calidad.png" alt="certificacion">
      </div>
    </div>
    <div class="linea-section__video">
      <img src="assets/imgs/call-center.jpeg" alt="office">
    </div>
    <div class="linea-section__services">
      <div class="info-principal">
        <div class="intro"><span>#Enlínea</span>conloquenecesitás</div>
        <div class="title">
          <div>Nuestros</div>
          <div>servicios</div>
        </div>
        <div class="subtitle">
          <p>Contamos con agentes altamente capacitados y bilingües, y tecnología de última generación para brindar servicios de calidad excepcional.</p>
        </div>
      </div>

      <div class="cards d-desktop">
      @for (item of cards; track $index) {
        <div class="card-servicio">
          <div class="image">
            <img [src]="item.img" alt="img-service">
          </div>
          <div class="title">
            <p>{{ item.title }}</p>
          </div>
          <div class="text">
            <p>
              {{ item.text }}
            </p>
          </div>
        </div>
      }
    </div>
    <div class="cards d-mobile">
      <swiper-container init="false">
        @for (item of cards; track $index) {
            <swiper-slide>
              <div class="card-servicio">
                <div class="image">
                  <img [src]="item.img" alt="img-service">
                </div>
                <div class="title">
                  <p>{{ item.title }}</p>
                </div>
                <div class="text">
                  <p>
                    {{ item.text }}
                  </p>
                </div>
              </div>
            </swiper-slide>
          }
        </swiper-container>
      </div>
    </div>
  </div>
  
  `,
  styleUrl: './linea-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineaSectionComponent implements AfterViewInit, OnInit{

  swiperElement = signal<SwiperContainer | null>(null);

  cards: any[] = [
    {
      img: "assets/imgs/servicios/contact-center.svg",
      title: "Contact Center",
      text: "Ofrecemos a las empresas de distintos rubros la posibilidad de disponer de nuestro Centro de Atención profesional las 24 horas, los 365 del año."
    },
    {
      img: "assets/imgs/servicios/atencion-emergencias.svg",
      title: "Atención para Emergencias Médicas",
      text: "Contamos con personal capacitado para la recepción de consultas del rubro salud y su correspondiente derivación o resolución inmediata."
    },
    {
      img: "assets/imgs/servicios/servicio-gruas.svg",
      title: "Servicio de Grúas",
      text: "Brindamos servicio de grúas para traslado y auxilio vehicular. Contamos con una amplia red de prestadores en Argentina y en países limítrofes. Atendemos a compañías de seguros y clientes particulares."
    }
  ]

  constructor(private elementRef: ElementRef, @Inject(PLATFORM_ID) private platformId: Object) { }
  
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.configSwiper();
  }

  ngOnInit(): void {
    this.configSwiper();
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

  configSwiper() {
    const swiperElemConstructor = document.querySelector('swiper-container');
    const swiperOptions: SwiperOptions = {
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },
      grabCursor: true,
      breakpoints: {
        0: {
          slidesPerView: 1
        },
        1070: {
          slidesPerView: 2
        }
      }
    };
    Object.assign(swiperElemConstructor!, swiperOptions);
    this.swiperElement.set(swiperElemConstructor as SwiperContainer);
    this.swiperElement()?.initialize();
  }

  initAnimation(): void {
    gsap.registerPlugin(ScrollTrigger);
    const cards = this.elementRef.nativeElement.querySelectorAll('.card-servicio');

    cards.forEach((card: HTMLElement, index: number) => {
      gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".linea-section__services",
          start: "top center", // Comienza la animación cuando el 80% superior del elemento es visible
          end: "bottom center", // Termina la animación cuando el 20% inferior del elemento es visible
          // scrub: true, // Hace que la animación se sincronice con el desplazamiento
        },
        delay: index * 0.15 // Aplica un retraso incremental
      });
    });
  }

}
