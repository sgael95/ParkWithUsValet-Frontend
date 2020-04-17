import { userConstants } from '../_constants';
import { vehicleConstants } from '../_constants';

let car = JSON.parse(localStorage.getItem('vehicle'));
const initialState = car ? { car } : {};

export function vehicle(state = initialState, action) {
    switch(action.type) {
        case userConstants.VEHICLE_REQUEST:
            return {
                retrievingVehicle: true
            };
        case userConstants.VEHICLE_SUCCESS:
            return {
                car: action.vehicle
            };
        case userConstants.VEHICLE_FAIL:
            return {
            };
        case userConstants.EMPTY_VEHICLE_REQUEST:
            return {
                ...state,
                retrievingVehicle: true
            };
        case userConstants.EMPTY_VEHICLE_SUCCESS:
            return {
                ...state,
                car: action.vehicle
            }
        case userConstants.EMPTY_VEHICLE_FAILURE:
            return {
                ...state,
                error: action.error
            }
        case vehicleConstants.ADD_VEHICLE_REQUEST:
            return {
                ...state,
                addingVehicle: true,
                vehicleGiven: action.vehicleParam
            };
        case vehicleConstants.ADD_VEHICLE_SUCCESS:
            return {...state};
        case vehicleConstants.ADD_VEHICLE_FAILURE:
            return {
                ...state,
                error: action.error};
        default:
            return state;
    }
}