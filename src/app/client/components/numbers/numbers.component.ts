import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-numbers',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  <div class="number-section">
    <div class="numbers" #numbersElem>
      <div class="number-box">
        <div class="number-dato">2500</div>
        <div class="text"><p>SERVICIOS DE <span>GRÚAS MENSUALES</span></p></div>
      </div>
      <div class="number-box">
        <div class="number-dato">550</div>
        <div class="text"><p>CARGAS DE <span>DENUNCIAS</span> POR SINIESTROS <span>ASEGURADOS</span></p></div>
      </div>
      <div class="number-box">
        <div class="number-dato">600</div>
        <div class="text"><p><span>ATENCIONES DE EMERGENCIAS</span> MÉDICAS Y URGENCIAS</p></div>
      </div>
    </div>
  </div>
  
  `,
  styleUrls: ['./numbers.component.scss'],
})
export class NumbersComponent implements AfterViewInit {
  @ViewChild('numbersElem') numbersElem!: ElementRef;

  constructor(private elementRef: ElementRef, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initAnimation();
    }
  }

  initAnimation(): void {
    gsap.registerPlugin(ScrollTrigger);
    const numbers = this.elementRef.nativeElement.querySelectorAll('.number-dato');
    console.log(this.numbersElem)
    numbers.forEach((item: HTMLElement) => {
      gsap.from(item, {
        scrollTrigger: {
          start: this.numbersElem.nativeElement.offsetTop,
        },
        textContent: 0,
        duration: 3,
        ease: "power1.in",
        snap: { textContent: 1 },
      });
    });
  }
}
