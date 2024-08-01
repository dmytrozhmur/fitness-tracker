import {Component, OnInit} from '@angular/core';
import {MatTabsModule} from "@angular/material/tabs";
import {NewTrainingComponent} from "./new-training/new-training.component";
import {PastTrainingsComponent} from "./past-trainings/past-trainings.component";
import {CurrentTrainingComponent} from "./current-training/current-training.component";
import {NgIf} from "@angular/common";
import {Subscription} from "rxjs";
import {TrainingService} from "./training.service";

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
export class TrainingComponent implements OnInit {
  ongoingTraining = false;
  tabIndex: number = 0;
  exerciseSubscription!: Subscription;

  constructor(private trainingService: TrainingService) {
  }

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(exercise => {
      this.ongoingTraining = !!exercise;
    })
  }
}
