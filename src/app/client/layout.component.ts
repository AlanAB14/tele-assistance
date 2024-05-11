import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, signal } from '@angular/core';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LineaSectionComponent } from './components/linea-section/linea-section.component';
import { InstalacionesComponent } from './components/instalaciones/instalaciones.component';
import { BeneficiosComponent } from './components/beneficios/beneficios.component';
import { PoliticasComponent } from './components/politicas/politicas.component';
import { NumbersComponent } from './components/numbers/numbers.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { ContactoComponent } from './components/contacto/contacto.component';

import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import gsap from 'gsap';
gsap.registerPlugin(ScrollToPlugin);

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    HeaderComponent,
    LineaSectionComponent,
    InstalacionesComponent,
    BeneficiosComponent,
    PoliticasComponent,
    NumbersComponent,
    EmpresasComponent,
    ContactoComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LayoutComponent implements OnInit{
  ngOnInit(): void {
    
  }

  @ViewChild('layoutBody') layoutBody!: ElementRef;
  @ViewChild('servicios') servicios!: ElementRef;
  @ViewChild('contacto') contacto!: ElementRef;
  targetOffset: any = signal(null);
  cargando: any = signal(true);

  
  goTo(item: any) {
    let paddingOffset = this.layoutBody.nativeElement.getBoundingClientRect().top;
    console.log(paddingOffset)
    if (item === 'servicios') {
      const targetElement = this.servicios.nativeElement;
      this.targetOffset.set(targetElement.offsetTop - 233 )
    }else if(item === 'contacto') {
      const targetElement = this.contacto.nativeElement;
      this.targetOffset.set(targetElement.offsetTop - 250 )
    }
    // Realizamos el desplazamiento suave utilizando GSAP
    gsap.to(window , {
      duration: 1, // Duración de la animación en segundos
      scrollTo: this.targetOffset
    });
  }

  isLoading(cargando: boolean) {
    this.cargando.set(cargando);
    console.log(this.cargando(), 'Signal')
  }
}
