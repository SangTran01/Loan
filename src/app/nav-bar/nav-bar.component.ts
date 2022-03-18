import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddLoanDialogComponent } from '../add-loan-dialog/add-loan-dialog.component';
import { DataService } from '../data-service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  message!: string;

  constructor(private dialog: MatDialog, private data: DataService) {}

  ngOnInit() {
    this.data.currentMessage.subscribe((message) => (this.message = message));
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddLoanDialogComponent, {
      width: '30%',
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if (result == 'add') {
        this.refreshTable(result);
      }
    });
  }

  refreshTable(result: string) {
    this.data.changeMessage('add');
  }
}
