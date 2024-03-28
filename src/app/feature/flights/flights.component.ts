import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { FlightService } from '../../services/flight.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { clsFlightDetails } from 'src/app/models/clsFlightDetails';
import { arrayObjectSort } from 'src/app/shared/utils/array-methods.utils';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
  showLoader: boolean = true;
  originValue: string = '';
  destinationValue: string = '';
  departureDateValue: string = '';
  selectedDate = '';
  displayedColumns: string[] = ['date', 'source', 'destination', 'price', 'airline', 'aircraft', 'duration', 'seatsAvailable'];
  allFlightsData: clsFlightDetails[] = [];
  sortedData: clsFlightDetails[] = [];
  airlinesData: (string | undefined)[] | undefined;
  airlinesClassData: (string | undefined)[] | undefined;
  airline: string = '';
  airlineClass: string = '';

  constructor(private flightService: FlightService) { }
  ngOnInit() {
    this.showLoader = true;
    this.flightService.getAllFlights().pipe(untilDestroyed(this)).subscribe(flightsData => {
      this.allFlightsData = flightsData;
      this.sortedData = flightsData;
      this.bindAirLines();
      this.bindClass();
      this.showLoader = false;
    })
  }

  bindAirLines() {
    this.airlinesData = [...new Set(this.allFlightsData.map(item => item.airline))];
  }

  bindClass() {
    this.airlinesClassData = [...new Set(this.allFlightsData.map(item => item.aircraft))];
  }

  filterAirlines(airline: string, airlineClass: string) {
    this.sortedData = this.allFlightsData;
    if (airline != "") {
      this.sortedData = this.sortedData?.filter(item => item.airline == airline);
    }
    if (airlineClass != "") {
      this.sortedData = this.sortedData?.filter(item => item.aircraft == airlineClass);
    }
  }
  
  sortData(sort: Sort) {
    const data: clsFlightDetails[] = this.allFlightsData.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = arrayObjectSort(data, "price", sort.direction == 'asc');
  }

  searchFlights() {
    this.sortedData = this.allFlightsData;
    let filterData = this.allFlightsData;
    if (this.originValue) {
      filterData = filterData?.filter(item => item?.origin?.toLowerCase().startsWith(this.originValue.toLowerCase()));
    }
    if (this.destinationValue) {
      filterData = filterData?.filter(item => item?.destination?.toLowerCase().startsWith(this.destinationValue.toLowerCase()));
    }
    if (this.departureDateValue) {
      filterData = filterData?.filter(item => item?.departureTime?.slice(0, item.departureTime.indexOf('T')) == this.departureDateValue);
    }
    this.sortedData = filterData;
  }

  clearSearch() {
    this.originValue = '';
    this.destinationValue = '';
    this.departureDateValue = '';
    this.sortedData = this.allFlightsData;
  }
}
