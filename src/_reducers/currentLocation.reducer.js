import { locationConstants } from '../_constants';

let location = JSON.parse(localStorage.getItem('location'));
const initialState = location ? { settingLocation: true, location } : {};

export function currentLocation(state = initialState, action) {
    switch (action.type) {
        case locationConstants.LOCATION_SET_REQUEST:
            return {
                settingLocation: true
            };
        case locationConstants.LOCATION_SET_SUCCESS:
            return {
                ...state,
                settingLocation: true,
                location: action.location
            };
        case locationConstants.LOCATION_SET_FAILURE:
            return {};
        default:
            return state
    }
}