import {Component, EventEmitter, Output} from '@angular/core';
import {MatCard, MatCardModule} from "@angular/material/card";
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatOption, MatSelect, MatSelectModule} from "@angular/material/select";

@Component({
  selector: 'app-new-training',
  standalone: true,
  imports: [
    MatCardModule,
    FlexModule,
    MatButton,
    MatFormField,
    MatSelectModule
  ],
  templateUrl: './new-training.component.html',
  styleUrl: './new-training.component.css'
})
export class NewTrainingComponent {
  @Output() trainingStart = new EventEmitter<void>();

  onStartTraining() {
    this.trainingStart.emit();
  }
}
