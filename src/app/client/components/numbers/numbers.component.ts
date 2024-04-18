import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-numbers',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  
  <div class="numbers">
    <div class="number-box">
      <div class="number">2500</div>
      <div class="text"><p>SERVICIOS DE <span>GRÚAS MENSUALES</span></p></div>
    </div>
    <div class="number-box">
      <div class="number">550</div>
      <div class="text"><p>CARGAS DE <span>DENUNCIAS</span> POR SINIESTROS <span>ASEGURADOS</span></p></div>
    </div>
    <div class="number-box">
      <div class="number">600</div>
      <div class="text"><p><span>ATENCIONES DE EMERGENCIAS</span> MÉDICAS Y URGENCIAS</p></div>
    </div>
  </div>
  
  `,
  styleUrl: './numbers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumbersComponent { }
