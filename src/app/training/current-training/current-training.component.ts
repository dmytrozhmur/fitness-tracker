import {Component, EventEmitter, Inject, OnInit, Output, output, PLATFORM_ID, signal} from '@angular/core';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {FlexModule} from "@angular/flex-layout";
import {MatButtonModule} from "@angular/material/button";
import {isPlatformBrowser, NgIf} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {StopTrainingComponent} from "./stop-training/stop-training.component";
import {TrainingService} from "../training.service";

// @ts-ignore
@Component({
  selector: 'app-current-training',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    FlexModule,
    MatButtonModule,
    StopTrainingComponent,
    NgIf
  ],
  templateUrl: './current-training.component.html',
  styleUrl: './current-training.component.css',
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  // @ts-ignore
  timer: number;
  isBrowser = signal<boolean>(false);
  @Output() trainingExit = new EventEmitter<void>();

  constructor(@Inject(PLATFORM_ID) platformId: object, private dialog: MatDialog, private trainingService: TrainingService) {
    this.isBrowser.set(isPlatformBrowser(platformId));
  }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  private startOrResumeTimer() {
    const step = this.trainingService.getRunningExercise().duration! / 100 * 1000;
    if (this.isBrowser()) {
      // @ts-ignore
      this.timer = setInterval(() => {
        this.progress = this.progress + 1;
        if (this.progress >= 100) {
          this.trainingService.completeExercise();
          clearInterval(this.timer);
        }
      }, step);
    }
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingService.cancelExercise(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}
