import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  
  <div class="footer">
    <div class="footer__tc">
      Tele Assistance es una unidad de
      <img src="assets/imgs/tc-logo.png" alt="tc-logo">
    </div>
    <div class="footer__copy">
      ©2023-2024 TeleAssistance.
    </div>
    <div class="footer__trabaja">
      <img src="assets/imgs/trabaja-nosotros.png" alt="trab">
      <p class="trabaja">Trabajá con nosotros</p>
    </div>
  </div>

  `,
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent { }
