import { vehicleConstants } from '../_constants';
import { vehicleService } from '../_services';
import { history } from '../_helpers';

export const vehicleActions = {
    addVehicle,
    getAll,
    getSpecificVehicle,
    getSpecificVehicleTicket,
    setVehicleId,
    updateVehiclesLocation,
    removeVehicle
};

function addVehicle(vehicleParam) {
    return dispatch => {
        dispatch(request(vehicleParam));

        vehicleService.addVehicle(vehicleParam)
            .then(
                vehicle => {
                    dispatch(success(vehicle))
                    history.push('/addVehicle');
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request(vehicleParam) { return { type: vehicleConstants.ADD_VEHICLE_REQUEST, vehicleParam } }
    function success(vehicle) { return { type: vehicleConstants.ADD_VEHICLE_SUCCESS, vehicle } }
    function failure(error) { return { type: vehicleConstants.ADD_VEHICLE_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        vehicleService.getAll()
            .then(
                vehicles => dispatch(success(vehicles)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: vehicleConstants.GETALL_VEHICLES_REQUEST } }
    function success(vehicles) { return { type: vehicleConstants.GETALL_VEHICLES_SUCCESS, vehicles } }
    function failure(error) { return { type: vehicleConstants.GETALL_VEHICLES_FAILURE, error } }
}

function getSpecificVehicle(locationParam, id) {
    return dispatch => {
        dispatch(request());

        vehicleService.getSpecificVehicle(locationParam, id)
            .then(
                vehicles => dispatch(success(vehicles)),
                history.push('/vehicleLocationPage'),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: vehicleConstants.GET_SPECIFIC_VEHICLE_REQUEST } }
    function success(vehicles) { return { type: vehicleConstants.GET_SPECIFIC_VEHICLE_SUCCESS, vehicles } }
    function failure(error) { return { type: vehicleConstants.GET_SPECIFIC_VEHICLE_FAILURE, error } }
}

function getSpecificVehicleTicket(locationParam, id) {
    return dispatch => {
        dispatch(request());

        vehicleService.getSpecificVehicle(locationParam, id)
            .then(
                vehicles => dispatch(success(vehicles)),
                history.push('/vehicleTicketPage'),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: vehicleConstants.GET_SPECIFIC_VEHICLE_REQUEST } }
    function success(vehicles) { return { type: vehicleConstants.GET_SPECIFIC_VEHICLE_SUCCESS, vehicles } }
    function failure(error) { return { type: vehicleConstants.GET_SPECIFIC_VEHICLE_FAILURE, error } }
}

function setVehicleId(id) {
    return dispatch => {
        dispatch(request(id));
        history.push('/vehicleLocationPage');
    };

    function request(id) { return { type: vehicleConstants.SET_VEHICLE_ID_REQEUST, id } } 
}

function updateVehiclesLocation(id, vehicle) {
    return dispatch => {
        dispatch(request(vehicle));

        vehicleService.updateVehicleLocation(id, vehicle)
            .then(
                dispatch(success(vehicle)),
                history.push('/addVehicle'),
                error => dispatch(failure(error.toString()))
            );
    };

    function request(vehicle) { return { type: vehicleConstants.UPDATE_VEHICLE_LOCATION_REQUEST, vehicle } }
    function success(vehicle) { return { type: vehicleConstants.UPDATE_VEHICLE_LOCATION_SUCCESS, vehicle } }
    function failure(error) { return { type: vehicleConstants.UPDATE_VEHICLE_LOCATION_FAILURE, error } }
}

function removeVehicle(id) {
    return dispatch => {
        dispatch(request(id));

        vehicleService.removeVehicle(id)
            .then(
                vehicle => dispatch(success()),
                history.push('/addVehicle'),
                error => dispatch(failure(error))
            );
    };

    function request(id) { return { type: vehicleConstants.REMOVE_VEHICLE_REQUEST } }
    function success() { return { type: vehicleConstants.REMOVE_VEHICLE_SUCCESS } }
    function failure(error) { return { type: vehicleConstants.REMOVE_VEHICLE_FAILURE, error } }
}