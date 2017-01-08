// angular module
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// nrgx
import { Store } from '@ngrx/store';

// immutable
import { List } from 'immutable';

// rxjs
import { Subscription } from 'rxjs';

// our actions
import { ConfigActions } from '../../../../shared-module/reducers/config.actions';
import { NavigationActions } from '../../../../shared-module/reducers/navigation.actions';

// interfaces
import { IStore } from '../../../../shared-module/interfaces/store.interface';
import {
  IMarker,
  IMarkers,
  INavigationList,
  ETypeMarkers,
  EControls,
  EWarnings,
  EControlPolices,
  EControlAccidents,
  EControlTrafficJams,
  EControlWarnings,
  EControlFavorites,
  EOnTheRoadCauses,
  ESideRoadCauses,
  EWeatherCauses
} from './../../../../shared-module/interfaces/navigation.interface';

// description of markers buttons
import { Marker } from './marker';

// service
import { MarkerService } from '../../../../shared-module/services/marker.service';
import { NavigationService } from '../../../../shared-module/services/navigation.service';

import { getCurrentLocation } from '../../../../shared-module/helpers/helper';


@Component({
  selector: 'app-marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.scss']
})

export class MarkerComponent implements OnInit, OnDestroy {
  public listMarkers: Marker[];
  private markerSub: Subscription;
  public markers: IMarker[] = [];
  public lng;
  public lat;
  public tmp: number;
  public a: number;
  public listeServeur: number[] = [1, 2, 3, 4, 5, 6];
  public listeUser: number[] = [3, 4, 5, 7, 8];

  constructor(
    private store$: Store<IStore>,
    private router: Router,
    private route: ActivatedRoute,
    public navService: NavigationService,
    private markerService: MarkerService

  ) {
    this.markerSub =
      store$.select('navigation')
        .map((navigationR: INavigationList) => navigationR.toJS())
        .subscribe(navigation => {
          this.markers = navigation;
        });
  }

  closeSidenavRightIfMobile() {
    this.store$.dispatch({ type: ConfigActions.CLOSE_SIDENAV_RIGHT_IF_MOBILE });
  }

  ngOnInit() {
    this.markerSub =
      this.route.params.subscribe(params => {

      });

    this.markerService.getMarkers()
      .subscribe(listMarkers => {
        this.listMarkers = listMarkers;
      });


    //this.testLoop();


  }

  ngOnDestroy() {
    this.markerSub.unsubscribe();
  }

  selectedMarker: Marker; // = this.markers[0];

  isSelected(m: Marker) {
    return this.selectedMarker === m;
  }

  selectIt(m: Marker) {



    console.log("etape 1");
    this.selectedMarker = m;
    this.store$.dispatch({ type: NavigationActions.FETCH_MARKER, payload: m.markerType });
  }

  removeIt(m: Marker) {
    this.store$.dispatch({ type: NavigationActions.REMOVE_MARKER });
  }

  getUserPosition(lat: number, lng: number) {
    this.navService.getNearByMarkers(lat, lng);
  }

  testLoop() {

    var br = 0;

    for (this.a = 0; this.a < this.listeUser.length; this.a++) {

      if (br == 1) {
        break;
      }

      if (this.listeServeur[this.a] == null) {
        this.listeUser.splice((this.listeUser.length - (this.listeUser.length - (this.a))), (this.listeUser.length - (this.a) ))
        break;
      }
      while (this.listeServeur[this.a] != this.listeUser[this.a]) {
        if (this.listeServeur[this.a] == null) {
          this.listeUser.splice(this.listeUser.length, this.listeUser.length - (this.a))
          br = 1
          break;
        }
        if (this.listeUser[this.a] < this.listeServeur[this.a])
          this.listeUser.splice(this.a, 1)
        else {
            this.listeUser.splice(this.a, 0, this.listeServeur[this.a])
        }
      }
      this.tmp = this.a + 1;
    }

    if (this.listeServeur[this.tmp] != null) {
      while (this.tmp < this.listeServeur.length) {
        this.listeUser.push(this.listeServeur[this.tmp]);
        this.tmp++
      }
    }

    for (var i = 0; i < this.listeUser.length; i++) {
      console.log(this.listeUser[i]);
    }
  }

}
