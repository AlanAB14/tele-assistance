import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-instalaciones',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  
    <div class="instalaciones__section">
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
      <div class="instalaciones__section__images">
        <img src="assets/imgs/instalaciones/instalaciones-1.svg" alt="instalaciones-1">
        <img src="assets/imgs/instalaciones/instalaciones-2.svg" alt="instalaciones-2">
        <img src="assets/imgs/instalaciones/instalaciones-3.svg" alt="instalaciones-3">
      </div>
      <div class="instalaciones__section__icon">
        <img src="assets/imgs/instalaciones/instalaciones-logo.svg" alt="logo">
      </div>
    </div>

  `,
  styleUrl: './instalaciones.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstalacionesComponent { }
