import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KayakBookingService {
  private apiUrl = 'http://localhost:8080';
  private apiKey =
    'VIGGO=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJWSUdHTyIsImlhdCI6MTczMzM5MTE2OCwiZXhwIjoxNzMzNDI3MTY4fQ.8QE--sghB1EU8u_bbmsETQ_RuY2W7P5HEbBo7twkyH8';
  private http: HttpClient | undefined;

  constructor(private injector: Injector) {
  }

  private getHttp(): HttpClient {
    if (!this.http) {
      this.http = this.injector.get(HttpClient);
    }
    return this.http;
  }

  sendBuyerData(buyerData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-KEY': this.apiKey,
    });

    return this.getHttp().post(`${this.apiUrl}/save-order`, buyerData, {
      headers,
      responseType: 'text' as 'json',
    });
  }

  getFutureTrips(filters: any, page: number, size: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-KEY': this.apiKey,
    });

    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (filters.startDate) {
      params = params.set('startDate', filters.startDate);
    }
    if (filters.endDate) {
      params = params.set('endDate', filters.endDate);
    }
    if (typeof filters.isFuture === 'boolean') {
      params = params.set('isFuture', filters.isFuture.toString());
    }

    return this.getHttp().get(`${this.apiUrl}/get-future-trips`, {
      headers,
      params,
      responseType: 'text' as 'json',
    });
  }

  updateTransactionDetails(transactionData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-KEY': this.apiKey,
    });
    return this.getHttp().put(`${this.apiUrl}/update-order`, transactionData, {
      headers,
      responseType: 'text' as 'json',
    });
  }

  deleteTrip(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-KEY': this.apiKey,
    });

    return this.getHttp().delete(`${this.apiUrl}/delete-order/${id}`, {
      headers,
      responseType: 'text' as 'json',
    });
  }

  login(username: string, password: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username, password };
console.log(body);
    return this.getHttp().post(`${this.apiUrl}/login`, body, { headers }).pipe(
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(() => new Error('Login failed. Please try again.'));
      })
    );
  }

}
