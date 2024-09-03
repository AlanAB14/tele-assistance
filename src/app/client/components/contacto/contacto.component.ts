import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Feature } from 'ol';
import Map from 'ol/Map';
import View from 'ol/View';
import { Point } from 'ol/geom';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import DragPan from 'ol/interaction/DragPan';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import { ContactsService } from '../../../services/contacts.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  template: `
 
  <div class="contacto">
    <div class="contacto-info">
      <p class="title">Contacto Comercial:</p>
      <p class="info"><span>0800 555 8353 </span><strong class="line">|</strong> info&#64;<span>teleassistance</span>.com.ar</p>
    </div>

    <div class="contacto-section">
      <form [formGroup]="contactForm">
      <div class="contacto-box">
        <div class="first-section">
          <div class="campo-form">

              <label>Nombre</label>
              <input type="text" formControlName="nombre" placeholder="Ingrese su nombre">
            </div>
            <div class="campo-form">
              <label>Apellido</label>
              <input type="text" formControlName="apellido" placeholder="Ingrese su apellido">
            </div>
            <div class="campo-form">
              <label>Email</label>
              <input type="email" formControlName="email" placeholder="Ingrese su mail">
            </div>
          </div>
          <div class="second-section">
            <div class="campo-form">
              <label>Mensaje</label>
              <textarea placeholder="Ingrese su mensaje" formControlName="mensaje"></textarea>
            </div>
          </div>
          <div class="btn-send">
            <button [disabled]="contactForm.invalid" (click)="sendData()">Enviar</button>
          </div>
        </div>
      </form>
      <div class="contacto-map">
      <div id="map" class="map"></div>
      </div>
    </div>
  </div>
  
  `,
  styleUrl: './contacto.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactoComponent implements OnInit {
  public map!: Map;
  private fb = inject(FormBuilder)
  private contactService = inject(ContactsService)
  screenWidth!: any;
  zoom: number = 17;
  @Output() cargandoEvent = new EventEmitter();

  @HostListener('window:resize', ['$event'])
  getScreenWidth() {
    this.screenWidth = window.innerWidth;
    this.setZoom();
  }

  contactForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    mensaje: ['', Validators.required],
  })

  setZoom() {
    if (this.screenWidth < 768) {
      this.zoom = 15;
      this.map.getView().setZoom(this.zoom);
      this.map.getInteractions().forEach(function (interaction) {
        if (interaction instanceof DragPan) {
          interaction.setActive(false);
        }
      });
    } else {
      this.zoom = 17;
      this.map.getView().setZoom(this.zoom);
      this.map.getInteractions().forEach(function (interaction) {
        if (interaction instanceof DragPan) {
          interaction.setActive(true);
        }
      });
    }
  }

  ngOnInit(): void {
    const iconFeature = new Feature({
      geometry: new Point(fromLonLat([-61.9945434, -33.729229])),
    });

    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'assets/imgs/marker.png',
      }),
    });

    iconFeature.setStyle(iconStyle)


    const vectorSource = new VectorSource({
      features: [iconFeature]
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'

          })
        }),
        vectorLayer
      ],
      view: new View({
        center: fromLonLat([-61.9945434, -33.729229]),
        zoom: this.zoom,
      })
    });

    this.setZoom();
  }

  sendData() {
    const body = {
      name: `${this.contactForm.value.nombre} ${this.contactForm.value.apellido}`,
      email: this.contactForm.value.email,
      message: this.contactForm.value.mensaje
    }
    console.log(body);
    this.cargandoEvent.emit(true);
    this.contactService.setContact(body)
      .subscribe(resp => {
        console.log(resp);
        this.cargandoEvent.emit(false);
        Swal.fire('Mensaje enviado con éxito!', '', 'success');
        this.contactForm.reset()
      }, (error) => {
        this.cargandoEvent.emit(false);
        Swal.fire('Error al enviar mensaje', '', 'error');
        console.log('Error al guardar contacto', error);
        this.contactForm.reset()
      })

  }
}
