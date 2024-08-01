import {Component} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {FlexModule} from "@angular/flex-layout";
import {MatButton} from "@angular/material/button";
import {MatFormField} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {TrainingService} from "../training.service";
import {Exercise} from "../exercise.model";
import {NgFor} from "@angular/common";
import {FormsModule, NgForm} from "@angular/forms";

@Component({
  selector: 'app-new-training',
  standalone: true,
  imports: [
    MatCardModule,
    FlexModule,
    MatButton,
    MatFormField,
    MatSelectModule,
    NgFor,
    FormsModule
  ],
  templateUrl: './new-training.component.html',
  styleUrl: './new-training.component.css'
})
export class NewTrainingComponent {
  exercises: Exercise[] = [];

  constructor(private  trainingService: TrainingService) {
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnInit() {
    this.exercises = this.trainingService.getAvailableExercises();
  }
}
