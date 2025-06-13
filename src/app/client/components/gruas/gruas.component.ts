import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-gruas',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule
  ],
  template: `
  <div class="gruas-section">
    <div class="gruas-section__title">
      <div class="gruas-title">
        <p>Grúas</p>
      </div>
      <div class="gruas-show-more link">
        <p>Conocé más</p>
        <img src="assets/imgs/arrow-right.svg" alt="arrow">
      </div>
    </div>
    <div class="gruas-section__body">
      <div class="info">
        <div class="text">
          <p>Brindamos servicio de grúas para traslado y auxilio vehicular. Contamos con una amplia red de prestadores en Argentina y en países limítrofes, y atendemos a compañías de seguros, brokers y clientes particulares.</p>
        </div>
        <div class="buttons">
          <a href="https://wa.me/5493462408602" style="text-decoration: none;" target="_blank" rel="noopener noreferrer" class="btn-primary">
            Whatsapp con la grúa
          </a>
          <button class="btn-primary-second" (click)="openDialog()">Quiero ser prestador de grúas</button>
        </div>
      </div>
      <div class="icon">
        <img src="assets/imgs/gruas/icon-gruas.png" alt="icon">
      </div>
    </div>
  </div>
  `,
  styleUrl: './gruas.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GruasComponent {
  constructor(public dialog: MatDialog) {}
   openDialog() {
    const dialogRef = this.dialog.open(DialogForm);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-form.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule],
  styles: [`
    .form {
        display: flex;
        flex-direction: column;
        gap: .2rem;

        input {
          width: 100%!important;
        }
    }
    `]
})
export class DialogForm {
  contactForm!: FormGroup;
  mailtoLink = '';

  constructor(private dialogRef: MatDialogRef<DialogForm>) {
    this.initForm();
  }

  initForm() {
    this.contactForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      provincia: new FormControl('', Validators.required),
      localidad: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefono: new FormControl('', Validators.required),
      mensaje: new FormControl('', Validators.required),
    });
  }


  onSubmit() {
    if (this.contactForm.valid) {
      const values = this.contactForm.value;

      const subject = encodeURIComponent('Formulario prestador de grúas');
      const body = encodeURIComponent(`
        Nombre: ${values.nombre}
        Apellido: ${values.apellido}
        Provincia: ${values.provincia}
        Localidad: ${values.localidad}
        Correo electrónico: ${values.email}
        Teléfono: ${values.telefono}
        Mensaje: ${values.mensaje}
        `
      );

      this.mailtoLink = `mailto:prestadores@tcsa.com.ar?subject=${subject}&body=${body}`;
      window.location.href = this.mailtoLink;
      this.dialogRef.close();
    } else {
      this.contactForm.markAllAsTouched();
    }
  }


}
