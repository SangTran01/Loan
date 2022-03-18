import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  Form,
} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Loan } from 'src/model/Loan';

@Component({
  selector: 'app-add-loan-dialog',
  templateUrl: './add-loan-dialog.component.html',
  styleUrls: ['./add-loan-dialog.component.css'],
})
export class AddLoanDialogComponent implements OnInit {
  id = new FormControl(0, [Validators.required]);
  firstName = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
  ]);
  lastName = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
  ]);
  institution = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
  ]);
  amount = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),
  ]);

  form: FormGroup;

  formIsValid: boolean = false;

  isUpdate: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<AddLoanDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private loan: Loan
  ) {
    this.form = this.formBuilder.group({});
    this.form.addControl('id', this.id);
    this.form.addControl('firstName', this.firstName);
    this.form.addControl('lastName', this.lastName);
    this.form.addControl('institution', this.institution);
    this.form.addControl('amount', this.amount);
  }

  ngOnInit(): void {
    if (this.loan != null) {
      console.log(this.loan);
      this.form.controls['id'].setValue(this.loan.id);
      this.form.controls['firstName'].setValue(this.loan.firstName);
      this.form.controls['lastName'].setValue(this.loan.lastName);
      this.form.controls['institution'].setValue(this.loan.institution);
      this.form.controls['amount'].setValue(this.loan.amount);

      this.isUpdate = true;
    }
  }

  getErrorMessage() {
    if (this.firstName.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.lastName.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.institution.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.amount.hasError('required')) {
      return 'You must enter a value';
    }

    return '';
  }

  addLoan() {
    if (this.form.valid) {
      if (!this.isUpdate) {
        this.api.addLoan(this.form.value).subscribe({
          next: (response) => {
            alert('product added');
            this.form.reset();
            this.dialogRef.close('add');
          },
          error: (error) => {
            alert('Error. Failed to create.');
          },
        });
      } else {
        this.api.updateLoan(this.loan.id, this.form.value).subscribe({
          next: (response) => {
            alert('product updated');
            this.form.reset();
            this.dialogRef.close('update');
          },
          error: (error) => {
            alert('Error. Failed to update.');
          },
        });
      }
    } else {
      this.form.markAllAsTouched();
    }
  }
}
