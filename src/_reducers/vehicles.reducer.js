import { vehicleConstants } from '../_constants';

export function vehicles(state = {}, action) {
    switch (action.type) {
        case vehicleConstants.GETALL_VEHICLES_REQUEST:
            return {
                loading: true
            };
        case vehicleConstants.GETALL_VEHICLES_SUCCESS:
            return {
                items: action.vehicles
            };
        case vehicleConstants.GETALL_VEHICLES_FAILURE:
            return {
                error: action.error
            };
        case vehicleConstants.GET_SPECIFIC_VEHICLE_REQUEST:
            return {
                loading: true
            };
        case vehicleConstants.GET_SPECIFIC_VEHICLE_SUCCESS:
            return {
                specificItem: action.vehicles
            };
        case vehicleConstants.GET_SPECIFIC_VEHICLE_FAILURE:
            return {
                error: action.error
            };
        case vehicleConstants.SET_VEHICLE_ID_REQEUST:
            return {
                vehicleId: action.id
            };
        case vehicleConstants.UPDATE_VEHICLE_LOCATION_REQUEST:
            return {
                updating: true,
                vehicleUpdating: action.vehicle
            };
        case vehicleConstants.UPDATE_VEHICLE_LOCATION_SUCCESS:
            return {
                updated: true,
                vehicleUpdated: action.vehicle
            };
        case vehicleConstants.UPDATE_VEHICLE_LOCATION_FAILURE:
            return {
                error: action.error
            };
        case vehicleConstants.REMOVE_VEHICLE_REQUEST:
            return {
                ...state,
                removeRequest: action.id
            };
        case vehicleConstants.REMOVE_VEHICLE_SUCCESS:
            return {
                ...state
            };
        case vehicleConstants.REMOVE_VEHICLE_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}