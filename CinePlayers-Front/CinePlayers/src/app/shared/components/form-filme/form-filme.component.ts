import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Filme } from 'src/app/core/models/filme.model';

@Component({
  selector: 'app-form-filme',
  templateUrl: './form-filme.component.html',
  styleUrls: ['./form-filme.component.css']
})
export class FormFilmeComponent {
  @Input() filmeForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {};
}
