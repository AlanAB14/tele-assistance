import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-gruas',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  <div class="gruas-section">
    <div class="gruas-section__title">
      <div class="gruas-title">
        <p>Gruas</p>
      </div>
      <div class="gruas-show-more link">
        <p>Conocé más</p>
        <img src="assets/imgs/arrow-right.svg" alt="arrow">
      </div>
    </div>
    <div class="gruas-section__body">
      <div class="info">
        <div class="text">
          <p>Brindamos servicio de grúas para traslado y auxilio vehicular. Contamos con una amplia red de prestadores en Argentina y en países limítrofes, y atendemos a compañías de seguros y clientes particulares.</p>
        </div>
        <div class="buttons">
          <button class="btn-primary">Whatsapp con la grúa</button>
          <button class="btn-primary-second">Quiero ser prestador de grúas</button>
        </div>
      </div>
      <div class="icon">
        <img src="assets/imgs/gruas/icon-gruas.png" alt="icon">
      </div>
    </div>
  </div>`,
  styleUrl: './gruas.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GruasComponent { }
