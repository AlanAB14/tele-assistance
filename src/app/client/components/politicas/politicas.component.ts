import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

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
        <div class="card">
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
export class PoliticasComponent {
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
  ]
}
