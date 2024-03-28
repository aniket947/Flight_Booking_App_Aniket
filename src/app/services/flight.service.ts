import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private http: HttpClient) { }
  flightsUrl: string = 'https://api.npoint.io/378e02e8e732bb1ac55b';  

  getAllFlights(): Observable<any> {
    return this.http.get(this.flightsUrl);       // Get API for All flights data
  }
}
