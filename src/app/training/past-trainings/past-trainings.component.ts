import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {DatePipe, DecimalPipe} from "@angular/common";
import {Exercise} from "../exercise.model";
import {TrainingService} from "../training.service";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";

@Component({
  selector: 'app-past-trainings',
  standalone: true,
  imports: [
    MatTableModule,
    DatePipe,
    DecimalPipe,
    MatSortModule,
    MatFormFieldModule,
    MatInput,
    FlexLayoutModule,
    MatPaginatorModule
  ],
  templateUrl: './past-trainings.component.html',
  styleUrl: './past-trainings.component.css'
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.trainingService.getPastExercises().subscribe({
      next: (exercises: Exercise[]) => {
        this.dataSource.data = exercises;
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(event: Event) {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }
}
