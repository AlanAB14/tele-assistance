import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Feature } from 'ol';
import Map from 'ol/Map';
import View from 'ol/View';
import { Point } from 'ol/geom';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
 
  <div class="contacto">
    <div class="contacto-info">
      <p class="title">Contacto Comercial:</p>
      <p class="info"><span>0800 555 8353</span> | info&#64;<span>teleassistance</span>.com.ar</p>
    </div>

    <div class="contacto-section">
      <div class="contacto-box">
        <div class="first-section">
          <div class="campo-form">
            <label>Nombre</label>
            <input type="text" placeholder="Ingrese su nombre">
          </div>
          <div class="campo-form">
            <label>Apellido</label>
            <input type="text" placeholder="Ingrese su apellido">
          </div>
          <div class="campo-form">
            <label>Email</label>
            <input type="text" placeholder="Ingrese su mail">
          </div>
        </div>
        <div class="second-section">
          <div class="campo-form">
            <label>Mensaje</label>
            <textarea placeholder="Ingrese su mensaje"></textarea>
          </div>
        </div>
        <div class="btn-send">
          <button>Enviar</button>
        </div>
      </div>
      <div class="contacto-map">
      <div id="map" class="map"></div>
      </div>
    </div>
  </div>
  
  `,
  styleUrl: './contacto.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactoComponent implements OnInit{
  public map!: Map;

  
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
        zoom: 17,
      })
    });
}
}
