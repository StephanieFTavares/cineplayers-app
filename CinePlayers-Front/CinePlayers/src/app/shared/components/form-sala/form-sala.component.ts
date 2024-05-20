import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-sala',
  templateUrl: './form-sala.component.html',
  styleUrls: ['./form-sala.component.css']
})
export class FormSalaComponent {
  @Input() salaForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Inicialize o formulário se não estiver inicializado
    if (!this.salaForm) {
      this.salaForm = this.fb.group({
        id: [''],
        nome: ['', Validators.required],
        capacidade: [0, Validators.required],
        sessoes: [[]]
      });
    }
  }
}
