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
    return this.http.post<Loan>(
      'https://loansapi.azurewebsites.net/api/loans',
      loan
    );
  }

  getLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(
      'https://loansapi.azurewebsites.net/api/loans'
    );
  }

  updateLoan(id: number, loan: Loan) {
    return this.http.put<Loan>(
      'https://loansapi.azurewebsites.net/api/loans/' + id,
      loan
    );
  }

  deleteLoan(id: number) {
    return this.http.delete<Loan>(
      'https://loansapi.azurewebsites.net/api/loans/' + id
    );
  }
}
