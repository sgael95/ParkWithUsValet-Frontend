import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { vehicle } from './vehicle.reducer';
import { vehicles } from './vehicles.reducer';
import { locations } from './locations.reducer';
import { currentLocation } from './currentLocation.reducer'

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  vehicle,
  vehicles,
  alert,
  locations,
  currentLocation
});

export default rootReducer;