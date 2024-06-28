import { Component } from '@angular/core';
import {MatTabsModule} from "@angular/material/tabs";
import {NewTrainingComponent} from "./new-training/new-training.component";
import {PastTrainingsComponent} from "./past-trainings/past-trainings.component";
import {CurrentTrainingComponent} from "./current-training/current-training.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [
    MatTabsModule,
    NewTrainingComponent,
    PastTrainingsComponent,
    CurrentTrainingComponent,
    NgIf
  ],
  templateUrl: './training.component.html',
  styleUrl: './training.component.css'
})
export class TrainingComponent {
  ongoingTraining = false;
  tabIndex: number = 0;
}
