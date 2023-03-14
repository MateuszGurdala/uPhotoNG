import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import DatabaseHttpClient from '../../services/database-http-client.service';
import { DatabaseOption } from '../../services/interfaces';
import ToolBox from '../../services/tool-box.service';
import AppPageBase from '../app-page-base';

@Component({
  selector: 'app-places-page',
  templateUrl: './places-page.component.html',
  styleUrls: ['./places-page.component.css'],
})
export class PlacesPageComponent extends AppPageBase {
  userPlaces: DatabaseOption[] = [];
  deletePlaceId: string;
  newPlaceName: string = '';

  constructor(
    private databaseHttpClient: DatabaseHttpClient,
    private toastr: ToastrService,
    private toolBox: ToolBox
  ) {
    super();
    this.setTitle('Places');
    this.loadUserPlaces();
  }

  loadUserPlaces() {
    this.databaseHttpClient
      .getDatabaseOption('Place/GetUserPlaces')
      .subscribe((next) => {
        if (next) {
          this.userPlaces = next as DatabaseOption[];
          this.deletePlaceId = this.userPlaces[0].id;
        } else {
          this.toastr.error('Places could not be loaded.');
        }
      });
  }

  addPlace() {
    this.newPlaceName = this.toolBox.removeWhiteSpaces(this.newPlaceName);
    if (this.toolBox.ifStrEmpty(this.newPlaceName)) {
      this.toastr.error('Place name is empty');
    } else {
      this.databaseHttpClient
        .putPlaceTest(this.newPlaceName)
        .subscribe((next) => {
          if (next) {
            this.toastr.success('New place has been added');
            this.loadUserPlaces();
          } else {
            this.toastr.error('Server error or place already exists', 'Failed');
          }
        });
    }
  }

  deletePlace() {
    this.databaseHttpClient
      .deletePlaceTest(this.deletePlaceId)
      .subscribe((next) => {
        if(next)
        {
          this.toastr.success('Place has been removed.');
          this.loadUserPlaces();
        }
        else
        {
          this.toastr.error('Server error or place could not be removed', 'Failed');
        }
      });
  }
}
