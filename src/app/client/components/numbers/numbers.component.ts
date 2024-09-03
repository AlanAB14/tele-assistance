import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterContentInit, AfterViewInit, Component, ElementRef, EventEmitter, Inject, OnInit, Output, PLATFORM_ID, ViewChild, signal } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { NumbersService } from '../../../services/numbers.service';
import { CountUpModule } from 'ngx-countup';

@Component({
  selector: 'app-numbers',
  standalone: true,
  imports: [
    CommonModule,
    CountUpModule
  ],
  template: `
  @if (numbers() !== null) {
    <div class="number-section">
      <div class="numbers" #numbersElem>
        <div class="number-box">
          <div class="number-dato" [countUp]="numbers()[0].number" [options]="{ enableScrollSpy: true, useGrouping: false, scrollSpyOnce: true }">0</div>
          <!-- <div class="number-dato">{{ numbers()[0].number }}</div> -->
          <div class="text"><p>SERVICIOS DE <span>GRÚAS MENSUALES</span></p></div>
        </div>
        <div class="number-box">
          <div class="number-dato" [countUp]="numbers()[1].number" [options]="{ enableScrollSpy: true, useGrouping: false, scrollSpyOnce: true }">0</div>
          <div class="text"><p>CARGAS DE <span>DENUNCIAS</span> POR SINIESTROS <span>ASEGURADOS</span></p></div>
        </div>
        <div class="number-box">
          <div class="number-dato" [countUp]="numbers()[2].number" [options]="{ enableScrollSpy: true, useGrouping: false, scrollSpyOnce: true }">0</div>
          <div class="text"><p><span>ATENCIONES DE EMERGENCIAS</span> MÉDICAS Y URGENCIAS</p></div>
        </div>
      </div>
    </div>
  }
  
  `,
  styleUrls: ['./numbers.component.scss'],
})
export class NumbersComponent implements OnInit {
  numbers: any = signal(null);

  @Output() cargandoEvent = new EventEmitter();
  @ViewChild('numbersElem') numbersElem!: ElementRef;

  constructor(private elementRef: ElementRef, @Inject(PLATFORM_ID) private platformId: Object, private numberService: NumbersService) { }
  
  
  ngOnInit(): void {
    this.getNumbers();
  }

  getNumbers() {
    this.cargandoEvent.emit(true);
    this.numberService.getNumbers()
      .subscribe((numbers: any) => {
        this.numbers.set(numbers)
        console.log(this.numbers())
        this.cargandoEvent.emit(false);
      }, (error) => {
        console.log('Error al traer numbers', error);
        this.cargandoEvent.emit(false);
      });
  }

}
