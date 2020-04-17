import { locationConstants } from '../_constants';
import { locationService, userService } from '../_services';
import { history } from '../_helpers';
import { alertActions } from './alert.actions';

export const locationActions = {
    getAllLocations,
    setLocation,
    addLocation,
    delete: _delete
};

function getAllLocations(){
    return dispatch => {
        dispatch(request());

        locationService.getAllLocations()
            .then(
                locations => dispatch(success(locations)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: locationConstants.GETALL_REQUEST } }
    function success(locations) { return { type: locationConstants.GETALL_SUCCESS, locations } }
    function failure(error) { return { type: locationConstants.GETALL_FAILURE, error } }
}

function setLocation(id){
    return dispatch => {
        dispatch(request({ id }));

        locationService.getById(id)
            .then(
                location => {
                    dispatch(success(location));
                    history.push('/addVehicle');
                },
                error => {
                    dispatch(failure(error.toString));
                }
            );
    };

    function request(location) { return { type: locationConstants.LOCATION_SET_REQUEST, location } }
    function success(location) { return { type: locationConstants.LOCATION_SET_SUCCESS, location } }
    function failure(error) { return { type: locationConstants.LOCATION_SET_FAILURE, error } }
}

function addLocation(location){
    return dispatch =>{
        dispatch(request(location));

        locationService.register(location)
            .then(
                location => {
                    dispatch(success(location));
                    history.push('/admin');
                    dispatch(alertActions.success("Location added"));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(location) { return { type: locationConstants.ADD_LOCATION_REQUEST, location } }
    function success(location) { return { type: locationConstants.ADD_LOCATION_SUCCESS, location } }
    function failure(error) { return { type: locationConstants.ADD_LOCAITON_FAILURE, error } }
}

function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        locationService.delete(id)
            .then(
                location => dispatch(success(id)),
                history.push('/admin'),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: locationConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: locationConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: locationConstants.DELETE_FAILURE, id, error } }
}