import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  
  <div class="header">
    <div class="header__content">
      <div class="header__content__text">
        <div class="title">
          <div>Servicio de</div>
          <div class="contact-center"><span>Contact Center</span></div>
          <div>y Grúas las 24hs.</div>
        </div>
        <div class="subtitle">
          <img src="assets/imgs/dialog-logo.svg" alt="dialog">
          <p><span>En línea</span> con lo que necesitás</p>
        </div>
        <div class="buttons">
          <button class="btn-primary">Whatsapp con la grua</button>
          <button class="btn-secondary">Quiero ser prestador de gruas</button>
        </div>
      </div>
      <div class="header__content__image">
        <img src="assets/imgs/header-img.svg" alt="header">
      </div>
    </div>
  </div>
  
  `,
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent { }
