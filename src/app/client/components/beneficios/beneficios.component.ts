import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-beneficios',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  
  <div class="beneficios">
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
export class BeneficiosComponent {
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
}
