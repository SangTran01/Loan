import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  Form,
} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-loan-dialog',
  templateUrl: './add-loan-dialog.component.html',
  styleUrls: ['./add-loan-dialog.component.css'],
})
export class AddLoanDialogComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
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

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<AddLoanDialogComponent>
  ) {
    this.form = this.formBuilder.group({});
    this.form.addControl('firstName', this.firstName);
    this.form.addControl('lastName', this.lastName);
    this.form.addControl('institution', this.institution);
    this.form.addControl('amount', this.amount);
  }

  ngOnInit(): void {}

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  addLoan() {
    if (this.form.valid) {
      this.api.addLoan(this.form.value).subscribe({
        next: (response) => {
          alert('product added');
          this.form.reset();
          this.dialogRef.close();
        },
        error: (error) => {
          alert('error ' + error);
        },
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
}
