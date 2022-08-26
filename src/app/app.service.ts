import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  BASE_URL = 'https://api.weatherapi.com/v1/current.json?key=';
  key = environment.key
  placeParamter = '&q='
  place = 'London'
  api = '&aqi=no';

  constructor(public httpClient: HttpClient) { }

  getWeatherInformation(placeToSearch: any) {
    return this.httpClient.get(this.BASE_URL + this.key + this.placeParamter + placeToSearch + this.api);
  }
}
