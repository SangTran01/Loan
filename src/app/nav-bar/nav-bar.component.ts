import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddLoanDialogComponent } from '../add-loan-dialog/add-loan-dialog.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  openDialog() {
    const dialogRef = this.dialog.open(AddLoanDialogComponent, {
      width: '30%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
