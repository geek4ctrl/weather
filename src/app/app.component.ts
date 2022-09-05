import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'weather';

  requestedWeatherObject: any;

  search: string = '';
  isWeatherShown = false;

  allBookmarks: any = [];
  allParsedBookmarks: any = [];

  LOCALLY_STORED_DATA_REFERENCE = 'data'

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.readSavedItems();
  }

  onSubmit(result: any) {
    this.appService.getWeatherInformation(result.search).subscribe(
      (result: any) => {
        this.requestedWeatherObject = result;
        this.isWeatherShown = true;
      }
    )
  }

  saveItem(requestedWeatherObject: any) {
    this.allBookmarks = this.getLocallyStoredBookmarks();
    this.allBookmarks = JSON.parse(this.allBookmarks) || [];

    this.persistItemsOnStorage(requestedWeatherObject)
    this.readSavedItems();
  }

  readSavedItems() {
    this.allParsedBookmarks = this.getLocallyStoredBookmarks();
    this.allParsedBookmarks = JSON.parse(this.allParsedBookmarks) || [];
  }

  clearBookmarks() {
    localStorage.setItem(this.LOCALLY_STORED_DATA_REFERENCE, JSON.stringify([]));

    this.readSavedItems();
  }

  getLocallyStoredBookmarks() {
    return localStorage.getItem(this.LOCALLY_STORED_DATA_REFERENCE)
  }

  persistItemsOnStorage(requestedWeatherObject: any) {
    this.allBookmarks.push(requestedWeatherObject);
    localStorage.setItem(this.LOCALLY_STORED_DATA_REFERENCE, JSON.stringify(this.allBookmarks));
  }
}
