import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  
  <div class="navbar">
    <div class="navbar__logo">
      <img src="assets/imgs/ta-logo.svg" alt="ta-logo">
    </div>
    <div class="navbar__items">
      <ul>
        <li><a (click)="scrollTo('servicios')">Servicios</a></li>
        <li><a (click)="scrollTo('contacto')">Contacto</a></li>
        <li><a (click)="scrollTo('ayuda')">Ayuda</a></li>
      </ul>
    </div>
    <div class="navbar__redes">
      <a href="#">
        <img src="assets/imgs/redes/tw-logo.svg" alt="x-logo">
      </a>
      <a href="#">
        <img src="assets/imgs/redes/fb-logo.svg" alt="fb-logo">
      </a>
      <a href="#">
        <img src="assets/imgs/redes/ig-logo.svg" alt="ig-logo">
      </a>
    </div>
  </div>
  
  `,
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  @Output() sendData = new EventEmitter();

  scrollTo(place: string) {
    this.sendData.emit(place)
  }
}
