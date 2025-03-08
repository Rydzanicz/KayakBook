import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KayakBookingService {
  private apiUrl = 'http://localhost:8080';
  private apiKey =
    'VIGGO=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJWSUdHTyIsImlhdCI6MTczMzM5MTE2OCwiZXhwIjoxNzMzNDI3MTY4fQ.8QE--sghB1EU8u_bbmsETQ_RuY2W7P5HEbBo7twkyH8';

  constructor(private http: HttpClient) {}

  sendBuyerData(buyerData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-KEY': this.apiKey,
    });

    return this.http.post(`${this.apiUrl}/save-order`, buyerData, {
      headers,
      responseType: 'text' as 'json',
    });
  }
}
