import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Loan } from 'src/model/Loan';
import { AddLoanDialogComponent } from '../add-loan-dialog/add-loan-dialog.component';
import { DataService } from '../data-service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.css'],
})
export class LoanListComponent implements OnInit {
  displayedColumns: string[] = [
    'First name',
    'Last name',
    'Institution',
    'Amount',
    'Actions',
  ];
  dataSource: MatTableDataSource<Loan>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  message!: string;

  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private data: DataService
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.getLoans();
    this.data.currentMessage.subscribe((message) => {
      console.log('list updated ' + message);
      this.message = message;
      this.getLoans();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getLoans() {
    this.api.getLoans().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  openEditDialog(loan: Loan) {
    const dialogRef = this.dialog.open(AddLoanDialogComponent, {
      width: '30%',
      data: loan,
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result == 'update') {
        this.getLoans();
      }
    });
  }

  deleteLoan(loan: Loan) {
    this.api.deleteLoan(loan.id).subscribe({
      next: (res) => {
        alert('Loan deleted successfuly');
        this.getLoans();
      },
      error: (err) => {
        alert('Error. Failed to delete');
      },
    });
  }
}
