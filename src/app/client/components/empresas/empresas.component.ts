import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-empresas',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  
  <div class="empresas">
    <div class="empresas__title">
      <p>Empresas e Instituciones que confían en nosotros:</p>
    </div>
    <div class="empresas__carousel">
      <div class="slider">
        <div class="slide-track">
          @for (item of logos; track $index) {
            <div class="slide">
              <img [src]="item.src" [alt]="item.alt" />
            </div>
          }
          @for (item of logos; track $index) {
            <div class="slide">
              <img [src]="item.src" [alt]="item.alt" />
            </div>
          }
        </div>
    </div>
    <div class="empresas__redes">
      <a href="#"><img src="assets/imgs/redes/fb-btn.svg" alt="fb"></a>
      <a href="#"><img src="assets/imgs/redes/ig-btn.svg" alt="ig"></a>
      <a href="#"><img src="assets/imgs/redes/yt-btn.svg" alt="yt"></a>
    </div>
    </div>
  </div>
  
  `,
  styleUrl: './empresas.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmpresasComponent {
  
  logos: any[] = [
    { src: 'assets/imgs/instituciones/allianz.jpg', alt: 'allianz'},
    { src: 'assets/imgs/instituciones/asa.jpg', alt: 'asa'},
    { src: 'assets/imgs/instituciones/asoc-mvt.jpg', alt: 'asoc-mvt'},
    { src: 'assets/imgs/instituciones/coop.jpg', alt: 'coop'},
    { src: 'assets/imgs/instituciones/friar.jpg', alt: 'friar'},
    { src: 'assets/imgs/instituciones/dvl.jpg', alt: 'dvl'},
    { src: 'assets/imgs/instituciones/facilassist.jpg', alt: 'facilassist'},
    { src: 'assets/imgs/instituciones/femedica.jpg', alt: 'femedica'},
    { src: 'assets/imgs/instituciones/kovak.jpg', alt: 'kovak'},
    { src: 'assets/imgs/instituciones/lc.jpg', alt: 'lc'},
    { src: 'assets/imgs/instituciones/morixe.jpg', alt: 'morixe'},
    { src: 'assets/imgs/instituciones/mutual-card.jpg', alt: 'mutual-card'},
    { src: 'assets/imgs/instituciones/novelli.jpg', alt: 'novelli'},
    { src: 'assets/imgs/instituciones/plyrap.jpg', alt: 'plyrap'},
    { src: 'assets/imgs/instituciones/primicia.jpg', alt: 'primicia'},
    { src: 'assets/imgs/instituciones/rda.jpg', alt: 'rda'},
    { src: 'assets/imgs/instituciones/red.jpg', alt: 'red'},
    { src: 'assets/imgs/instituciones/vrc.jpg', alt: 'vrc'},
  ]

}
