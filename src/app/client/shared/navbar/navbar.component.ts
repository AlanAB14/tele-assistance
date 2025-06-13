import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import Swal from 'sweetalert2';

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
        <li><a (click)="scrollTo('grua')">Grúa</a></li>
        <li><a (click)="scrollTo('ayuda')">Ayuda</a></li>
      </ul>
    </div>

    <div class="navbar__trabaja" (click)="trabajaConNosotros()">
      <img src="assets/imgs/trabaja-nosotros.png" alt="trab">
      <p class="trabaja">Trabajá con nosotros</p>
    </div>

    <div class="navbar__redes">
      <a href="https://www.linkedin.com/company/teleassistance-oficial/" target="_blank">
        <img src="assets/imgs/redes/ln-logo.png" alt="x-logo">
      </a>
      <a href="https://www.facebook.com/p/Tele-Assistance-61551874601317/" target="_blank">
        <img src="assets/imgs/redes/fb-logo.svg" alt="fb-logo">
      </a>
      <a href="https://www.instagram.com/tele.assistance/" target="_blank">
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
            <li><a (click)="scrollToClose('grua')">Grúa</a></li>
            <li><a (click)="scrollToClose('ayuda')">Ayuda</a></li>
        </ul>

        <div class="navbar-responsive__trabaja" (click)="trabajaConNosotros()">
          <img src="assets/imgs/trabaja-nosotros.png" alt="trab">
          <p class="trabaja">Trabajá con nosotros</p>
        </div>

        <div class="navbar-responsive-redes animate__animated animate__fadeIn animate__faster" *ngIf="isExpanded">
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

  trabajaConNosotros() {
    Swal.fire({
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Quiero enviar mi CV",
      denyButtonText: `Quiero ser prestador`,
      denyButtonColor: "#469ed6",
      cancelButtonText: "Cancelar",
      imageUrl: "assets/imgs/trabaja-con-nosotros.png"
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const mailToLink = this.generateMailtoLink("rrhh@tcsa.com.ar", "Solicitud de empleo")
        window.location.href = mailToLink;
      } else if (result.isDenied) {
        const mailToLink = this.generateMailtoLink("prestadores@tcsa.com.ar", "Solicitud de prestador")
        window.location.href = mailToLink;
      }
    });
  }


  generateMailtoLink(to: string, subject: string,): string {
    return `mailto:${to}?subject=${encodeURIComponent(subject)}`;
  }
}
