import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Inject, OnInit, Output, PLATFORM_ID } from '@angular/core';


@Component({
  selector: 'app-linea-section',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  <div class="linea-section">
    <div class="linea-section__title">
      <div class="title">
        <div>En línea</div>
        <div><span>con lo que necesitás</span></div>
      </div>
      
      <div class="subtitle">
        <p>TeleAssistance es un servicio de asistencia telefónicadisponible las <span>24 hs, los 365 días del año.</span></p>
      </div>

      <div class="certification">
        <p>Certificación de Calidad</p>
        <img src="assets/imgs/certificacion-calidad.svg" alt="certificacion">
      </div>
    </div>
    <div class="linea-section__video">
      <img src="assets/imgs/office.png" alt="office">
    </div>
    <div class="linea-section__services">
      <div class="info-principal">
        <div class="intro"><span>#Enlínea</span>conloquenecesitás</div>
        <div class="title">
          <div>Nuestros</div>
          <div>servicios</div>
        </div>
        <div class="subtitle">
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
        </div>
      </div>
      <div class="cards">

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
    </div>
  </div>
  
  `,
  styleUrl: './linea-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineaSectionComponent   {
  // @Output() sendData = new EventEmitter();

  cards: any[] = [
    {
      img: "assets/imgs/servicios/contact-center.svg",
      title: "Contact Center",
      text: "Ofrecemos a las empresas de distintos rubros la posibilidad de disponer de nuestro Centro de Atención Telefónica profesional las 24 horas, los 365 del año..."
    },
    {
      img: "assets/imgs/servicios/atencion-emergencias.svg",
      title: "Atención para Emergencias Médicas",
      text: "Contamos con personal capacitado para la recepción de consultas del rubro salud y su correspondiente derivación o resolución inmediata..."
    },
    {
      img: "assets/imgs/servicios/servicio-gruas.svg",
      title: "Servicio de Grúas",
      text: "Brindamos servicio de grúas para traslado y auxilio vehicular. Contamos con una amplia red de prestadores en Argentina y en países limítrofes. Atendemos a compañías de seguros y clientes particulares."
    }
  ]



  
}
