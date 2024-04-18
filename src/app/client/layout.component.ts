import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
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
export default class LayoutComponent { }
