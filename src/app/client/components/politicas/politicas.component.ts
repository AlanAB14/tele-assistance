import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-politicas',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  
  <div class="politicas">
    <div class="politicas__title">
      <p>Nuestras Políticas</p>
    </div>
    <div class="politicas__subtitle">
      <p>Nuestro Contact Center cuenta con los mejores agentes formados en las principales disciplinas de Atención al Cliente. Posee, además, tecnología de última generación para la recepción de consultas y urgencias telefónicas y su correspondiente resolución.</p>
    </div>
    <div class="politicas__cards">
      @for (item of politicas; track $index) {
        <div class="card" [ngClass]="{'card-izquierda': $index % 2 === 0, 'card-derecha': $index % 2 !== 0}">
          <div class="icon">
            <div class="icon-logo" [style.background-color]="item.color">
              <img src="assets/imgs/politicas/politicas-icon.svg" alt="politicas">
            </div>
          </div>
          <div class="content">
            <div class="title">
              <p>{{ item.title }}</p>
            </div>
            <div class="text">
              <p>{{ item.text }}</p>
            </div>
          </div>
        </div>
      }
    </div>
  </div>
  
  `,
  styleUrl: './politicas.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PoliticasComponent implements AfterViewInit{
  politicas: any[] = [
    {
      color: 'rgba(253, 173, 87, 0.65)',
      title: 'Priorizar',
      text: 'la capacitación permanente para asegurar las competencias del personal en los diferentes niveles de la organización y generar un ambiente de trabajo motivador, brindando el apoyo y los recursos necesarios para garantizar la mejora continua.'
    },
    {
      color: 'rgba(104, 202, 149, 0.65)',
      title: 'Adaptarse',
      text: 'a las nuevas demandas, focalizando permanentemente en la innovación de la tecnología y los procesos, mediante una organización flexible que sea capaz de dar respuesta a las necesidades de los clientes, actuales y potenciales.'
    },
    {
      color: 'rgba(49, 46, 129, 0.65)',
      title: 'Proveer',
      text: 'bienes y servicios que constantemente satisfagan los requerimientos de los clientes, el capital humano y la dirección estratégica de la empresa.'
    },
    {
      color: 'rgba(255, 95, 95, 0.65)',
      title: 'Adoptar',
      text: 'una estrategia de estandarización de los procesos para mejorar la eficiencia y obtener los mejores costos, estableciendo metas y objetivos específicos.'
    },
    {
      color: 'rgba(155, 224, 101, 0.65)',
      title: 'Trabajar',
      text: 'en conjunto con nuestros proveedores para alcanzar su compromiso con la calidad, y así poder garantizarla a nuestros clientes.'
    },
    {
      color: 'rgba(104, 178, 202, 0.65)',
      title: 'Contribuir',
      text: 'de manera activa y responsable con el desarrollo sustentable.'
    },
  ];

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
    const cardsIzquierda = this.elementRef.nativeElement.querySelectorAll('.card-izquierda');
    const cardsDerecha = this.elementRef.nativeElement.querySelectorAll('.card-derecha');

    cardsIzquierda.forEach((card: HTMLElement, index: number) => {
      gsap.to(card, {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".politicas",
          start: "top center", // Comienza la animación cuando el 80% superior del elemento es visible
          end: "bottom center", // Termina la animación cuando el 20% inferior del elemento es visible
          // scrub: true, // Hace que la animación se sincronice con el desplazamiento
        },
        delay: index * 0.15 // Aplica un retraso incremental
      });
    });

    cardsDerecha.forEach((card: HTMLElement, index: number) => {
      gsap.to(card, {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: ".politicas",
          start: "top center", // Comienza la animación cuando el 80% superior del elemento es visible
          end: "bottom center", // Termina la animación cuando el 20% inferior del elemento es visible
          // scrub: true, // Hace que la animación se sincronice con el desplazamiento
        },
        delay: index * 0.15 // Aplica un retraso incremental
      });
    });
  }
}
