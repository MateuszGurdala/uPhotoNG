import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import DatabaseHttpClient from '../../services/database-http-client.service';
import { DatabaseOption } from '../../services/interfaces';
import ToolBox from '../../services/tool-box.service';
import AppPageBase from '../app-page-base';

@Component({
  selector: 'app-albums-page',
  templateUrl: './albums-page.component.html',
  styleUrls: ['./albums-page.component.css'],
})
export class AlbumsPageComponent extends AppPageBase {
  userAlbums: DatabaseOption[] = [];
  deleteAlbumId: string;
  newAlbumName: string = '';

  constructor(
    private databaseHttpClient: DatabaseHttpClient,
    private toastr: ToastrService,
    private toolBox: ToolBox
  ) {
    super();
    this.setTitle('Albums');
    this.loadUserAlbums();
  }

  loadUserAlbums() {
    this.databaseHttpClient
      .getDatabaseOption('Album/GetUserAlbums')
      .subscribe((next) => {
        if (next) {
          this.userAlbums = next as DatabaseOption[];
          this.deleteAlbumId = this.userAlbums[0].id;
        } else {
          this.toastr.error('Albums could not be loaded.');
        }
      });
  }

  addAlbum() {
    this.newAlbumName = this.toolBox.removeWhiteSpaces(this.newAlbumName);
    if (this.toolBox.ifStrEmpty(this.newAlbumName)) {
      this.toastr.error('Album name is empty');
    } else {
      this.databaseHttpClient
        .putAlbumTest(this.newAlbumName)
        .subscribe((next) => {
          if (next) {
            this.toastr.success('New album has been added');
            this.loadUserAlbums();
          } else {
            this.toastr.error('Server error or album already exists', 'Failed');
          }
        });
    }
  }

  deleteAlbum() {
    console.log(this.deleteAlbumId);
    this.databaseHttpClient
      .deleteAlbumTest(this.deleteAlbumId)
      .subscribe((next) => {
        if(next)
        {
          this.toastr.success('Album has been removed.');
          this.loadUserAlbums();
        }
        else
        {
          this.toastr.error('Server error or album could not be', 'Failed');
        }
      });
  }
}
