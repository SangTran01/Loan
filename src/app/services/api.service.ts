import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Loan } from 'src/model/Loan';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  addLoan(loan: Loan) {
    return this.http.post<Loan>('https://localhost:7066/api/Loans', loan);
  }

  getLoans() {
    return this.http.get<Loan>('https://localhost:7066/api/Loans');
  }
}
