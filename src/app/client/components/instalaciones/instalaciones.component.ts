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
        <img src="assets/imgs/instalaciones/instalaciones-logo.svg" alt="logo">
      </div>
    </div>

  `,
  styleUrl: './instalaciones.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstalacionesComponent implements AfterViewInit{
  @ViewChild('instalaciones') instalaciones!: ElementRef;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    // const boxModules = document.querySelectorAll(".images-instalaciones");
    if (isPlatformBrowser(this.platformId)) {
        gsap.to(".images-instalaciones", {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: ".instalaciones__section",
            start: "top center", // Comienza la animación cuando el 80% superior del elemento es visible
            end: "bottom center", // Termina la animación cuando el 20% inferior del elemento es visible
            // scrub: true, // Hace que la animación se sincronice con el desplazamiento
            markers: true,


          }
        });

    }
  }
}
