import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { UsersService } from '../../../services/users.service';
import { forkJoin } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import Swal from 'sweetalert2';
import { NumbersService } from '../../../services/numbers.service';

@Component({
  selector: 'app-datos',
  standalone: true,
  imports: [
    CommonModule,
    MatIcon,
    MatButtonModule,
    MatProgressSpinner,
    MatTooltipModule
  ],
  template: `

  @if (cargandoData && !this.numbers()) {
    <div class="cargando">
      <mat-spinner></mat-spinner>
    </div>
  }
  
  @if (!cargandoData && numbers()) {
    <div class="datos-table">
      @for (item of numbers(); track $index) {
        <div class="datos-table-element">
          <div class="datos-table-element--header" [ngClass]="{'border-radius-left-top' : $index === 0, 'border-radius-right-top' : $index === 2 }">
            @if (item.type === 'gruas') {
              <h1>Grúas</h1>
              <mat-icon>minor_crash</mat-icon>
            }@else if(item.type === 'denuncias') {
              <h1>Denuncias</h1>
              <mat-icon>description</mat-icon>
            }@else if(item.type === 'emergencias') {
              <h1>Emergencias</h1>
              <mat-icon>medical_services</mat-icon>
            }
          </div>
          <div class="datos-table-element--data">
            <p>{{ item.number }}</p>
          </div>
          <div class="datos-table-element--last-modified">
            <p>Última modificación</p>
            @if (!cargandoData && users().length > 0) {
                @if (getUserData(item.updated_by).avatar) {
                  <img class="img-avatar" [matTooltip]="getUserData(item.updated_by).username" [src]="getUserData(item.updated_by).avatar" alt="img-user">
                }@else {
                  <mat-icon class="icon-user" [matTooltip]="getUserData(item.updated_by).username">account_circle</mat-icon>
                }
              }@else {
                <mat-spinner class="img-avatar"></mat-spinner>
              }
          </div>
          <div class="datos-table-element--action">
            <button (click)="editNumber(item)" mat-mini-fab color="primary">
              <mat-icon>edit</mat-icon>
            </button>
          </div>
        </div>
      }
    </div>
  }
  `,
  styleUrl: './datos.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DatosComponent implements OnInit {
  cargandoData: boolean = true;
  numbers: any = signal(null);
  users = signal<any[]>([]);
  numbersService = inject(NumbersService);
  usersService = inject(UsersService);

  ngOnInit(): void {
    this.getNumbers();
  }

  getNumbers() {
    this.cargandoData = true;
    this.numbersService.getNumbers()
      .subscribe((numbers: any) => {
        console.log(numbers)
        this.numbers.set(numbers)
        this.getUsers();
        this.cargandoData = false;
      }, (error) => {
        console.log('Error al traer numbers', error);
        this.cargandoData = false;
      })
  }

  getUsers() {
    this.cargandoData = true;
    const observablesArray = this.numbers().map((number: any) => {
      return this.usersService.getUser(number.updated_by);
    });

    forkJoin(observablesArray).subscribe(
      (userDataArray: any) => {
        userDataArray.forEach((userData: any) => {
          this.users.update((values: any) => {
            return [...values, userData]
          });
        });
        this.cargandoData = false;
      },
      (error) => {
        console.log('Error en getUsers', error);
        this.cargandoData = false;
      }
    );
  }

  getUserData(id: number) {
    const elemento = this.users().find((item: any) => item.user_id === id);
    return elemento;
  }

  editNumber(item: any) {
    Swal.fire({
      text: 'Ingrese el nuevo número',
      showCancelButton: true,
      input: 'number',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Modificar',
      customClass: {
        confirmButton: '',
      }
    }).then((resp) => {
      console.log(resp)
      if (resp.isConfirmed) {
        if (resp.value) {
          const body = {
            number: Number(resp.value),
            type: item.type
          }
          this.numbersService.editNumbers(body)
          .subscribe((resp: any) => {
            Swal.fire({
              text: 'Dato modificado con éxito',
              icon: 'success',
              confirmButtonText: 'OK',
              customClass: {
                confirmButton: '',
              },
            });
            this.getNumbers();
          }, (error: any) => {
            Swal.fire({
              text: 'Error al modificar dato',
              icon: 'error',
              confirmButtonText: 'OK',
              customClass: {
                confirmButton: '',
              }
            });
            console.log(error);
            this.getNumbers();
          })
        }else {
          Swal.fire({
            text: 'Debes ingresar un valor',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        }

      }
    });
  }


}
