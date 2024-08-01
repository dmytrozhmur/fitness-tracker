import {Injectable, signal} from '@angular/core';
import {Exercise} from "./exercise.model";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  exerciseChanged = new Subject<Exercise | null>();
  availableExercises: Exercise[] = [
    {id: 'crunches', name: 'Crunches', duration: 30, calories: 8},
    {id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15},
    {id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18},
    {id: 'burpees', name: 'Burpees', duration: 60, calories: 8}
  ];
  private runningExercise: Exercise | undefined | null;
  private pastExercises: Exercise[] = [];
  private pastExercisesSubject = new Subject<Exercise[]>();

  constructor() {
    this.pastExercisesSubject.next(this.pastExercises);
  }

  getAvailableExercises() {
    return this.availableExercises.slice();
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  getPastExercises() {
    return this.pastExercisesSubject;
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
    if (this.runningExercise) {
      this.exerciseChanged.next({ ...this.runningExercise });
    }
  }

  completeExercise() {
    if (this.runningExercise) {
      this.pastExercises.push({
        ...this.runningExercise!,
        date: new Date(),
        state: 'completed'
      });
      this.pastExercisesSubject.next(this.pastExercises);
      this.runningExercise = null;
      this.exerciseChanged.next(null);
    }
  }

  cancelExercise(progress: number) {
    if (this.runningExercise) {
      this.pastExercises.push({
        ...this.runningExercise!,
        duration: this.runningExercise!.duration * (progress / 100),
        calories: this.runningExercise!.calories * (progress / 100),
        date: new Date(),
        state: 'cancelled'
      });
      this.pastExercisesSubject.next(this.pastExercises);
      this.runningExercise = null;
      this.exerciseChanged.next(null);
    }
  }
}
