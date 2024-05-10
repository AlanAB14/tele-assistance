import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule
  ],
  animations: [

    trigger('hamburguerX', [
      /*
        state hamburguer => is the regular 3 lines style.
        states topX, hide, and bottomX => used to style the X element
      */
      state('hamburguer', style({})),
      // style top bar to create the X
      state(
        'topX',
        style({
          transform: 'rotate(45deg)',
          transformOrigin: 'left',
          margin: '6px',
        })
      ),
      // hides element when create the X (used in the middle bar)
      state(
        'hide',
        style({
          opacity: 0,
        })
      ),
      // style bottom bar to create the X
      state(
        'bottomX',
        style({
          transform: 'rotate(-45deg)',
          transformOrigin: 'left',
          margin: '6px',
        })
      ),
      transition('* => *', [
        animate('0.2s'), // controls animation speed
      ]),
    ]),
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
        <img src="assets/imgs/redes/ln-logo.png" alt="x-logo">
      </a>
      <a href="#">
        <img src="assets/imgs/redes/fb-logo.svg" alt="fb-logo">
      </a>
      <a href="#">
        <img src="assets/imgs/redes/ig-logo.svg" alt="ig-logo">
      </a>
    </div>
  </div>

  <div class="navbar-responsive">
    <div class="navbar-responsive__top">
      <div class="navbar__logo">
        <img src="assets/imgs/ta-logo.svg" alt="ta-logo">
      </div>
      <div class="navbar-responsive__top__expand">
      <div (click)="onClick()" class="btn">
        <div class="icon-bar" [@hamburguerX]="isHamburguer ? 'hamburguer' : 'topX'"></div>
        <div class="icon-bar" [@hamburguerX]="isHamburguer ? 'hamburguer' : 'hide'"></div>
        <div class="icon-bar" [@hamburguerX]="isHamburguer ? 'hamburguer' : 'bottomX'"></div>
    </div>
      </div>
    </div>

    <div class="navbar-responsive__body" [ngClass]="{expanded: isExpanded}" >
        <ul class="animate__animated animate__fadeIn animate__faster" *ngIf="isExpanded">
            <li><a (click)="scrollToClose('servicios')">Servicios</a></li>
            <li><a (click)="scrollToClose('contacto')">Contacto</a></li>
            <li><a (click)="scrollToClose('ayuda')">Ayuda</a></li>
        </ul>

        <div class="navbar-responsive-redes">
          <div class="navbar__redes">
            <a href="#">
              <img src="assets/imgs/redes/ln-logo.png" alt="x-logo">
            </a>
            <a href="#">
              <img src="assets/imgs/redes/fb-logo.svg" alt="fb-logo">
            </a>
            <a href="#">
              <img src="assets/imgs/redes/ig-logo.svg" alt="ig-logo">
            </a>
          </div>
        </div>
    </div>
  </div>
  
  `,
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  @Output() sendData = new EventEmitter();
  isExpanded: boolean = false;
  isHamburguer = true;


  onClick() {
    this.isHamburguer = !this.isHamburguer;
    this.toggleMenu();
  }

  scrollTo(place: string) {
    this.sendData.emit(place)
  }

  scrollToClose(place: string) {
    this.isExpanded = false;
    this.isHamburguer = true;
    this.sendData.emit(place);
  }

  toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }
}
