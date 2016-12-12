// angular module
import { Component } from '@angular/core';

// ngrx - store
import { Store } from '@ngrx/store';

// our actions
import { ConfigActions } from '../../reducers/config.actions';

// interfaces
import { IStore } from '../../interfaces/store.interface';

@Component({
  selector: 'app-markers-sidenav',
  templateUrl: './markers-sidenav.component.html',
  styleUrls: ['./markers-sidenav.component.scss']
})
export class MarkersSidenavComponent {

  constructor(private store$: Store<IStore>) { }

  toggleMarkersSidenav() {
    this.store$.dispatch({ type: ConfigActions.TOGGLE_SIDENAV });
  }
}
