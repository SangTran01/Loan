import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Loan } from 'src/model/Loan';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  addLoan(loan: Loan) {
    return this.http.post<Loan>('https://localhost:7066/api/Loans', loan);
  }

  getLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>('https://localhost:7066/api/Loans');
  }

  updateLoan(id: number, loan: Loan) {
    return this.http.put<Loan>('https://localhost:7066/api/Loans/' + id, loan);
  }

  deleteLoan(id: number) {
    return this.http.delete<Loan>('https://localhost:7066/api/Loans/' + id);
  }
}
