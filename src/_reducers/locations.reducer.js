import { locationConstants } from '../_constants';

export function locations(state = {}, action) {
    switch(action.type) {
        case locationConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case locationConstants.GETALL_SUCCESS: 
            return {
                items: action.locations
            };
        case locationConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        case locationConstants.DELETE_REQUEST:
            return {
                ...state,
                items: state.items.map(location =>
                  location.id === action.id
                    ? { ...location, deleting: true }
                    : location
                )
              };
        case locationConstants.DELETE_SUCCESS:
            return {
                items: state.items.filter(location => location.id !== action.id)
            };
        case locationConstants.DELETE_FAILURE:
            return {
                ...state,
                items: state.items.map(location => {
                    if (location.id === action.id) {
                        const { deleting, ...locationCopy } = location;

                        return { ...locationCopy, deleteError: action.error };
                    }
                    return location;
                })
            };

        case locationConstants.ADD_LOCATION_REQUEST:
            return {
                locationSent: action.location
            };
        case locationConstants.ADD_LOCATION_SUCCESS:
            return {
                locationSuccess: action.location
            };
        case locationConstants.ADD_LOCATION_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}