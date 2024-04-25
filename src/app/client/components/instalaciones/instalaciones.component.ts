import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

@Component({
  selector: 'app-instalaciones',
  standalone: true,
  imports: [
    CommonModule
  ],
  template: `
  
    <div class="instalaciones__section" #instalaciones>
      <div class="instalaciones__section__header">
        <div class="title">
          <h1>Nuestras Instalaciones</h1>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>
        <div class="link">
          <p>Conocé más</p>
          <img src="assets/imgs/arrow-right.svg" alt="arrow">
        </div>
      </div>
      <div class="instalaciones__section__images" >
        <img class="images-instalaciones" src="assets/imgs/instalaciones/instalaciones-1.png" alt="instalaciones-1">
        <img class="images-instalaciones" src="assets/imgs/instalaciones/instalaciones-2.png" alt="instalaciones-2">
        <img class="images-instalaciones" src="assets/imgs/instalaciones/instalaciones-3.png" alt="instalaciones-3">
      </div>
      <div class="instalaciones__section__icon">
        <img class="images-instalaciones-logo" src="assets/imgs/instalaciones/instalaciones-logo.svg" alt="logo">
      </div>
    </div>

  `,
  styleUrl: './instalaciones.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstalacionesComponent implements AfterViewInit {
  @ViewChild('instalaciones') instalaciones!: ElementRef;
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
    gsap.to([".images-instalaciones",".images-instalaciones-logo"], {
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