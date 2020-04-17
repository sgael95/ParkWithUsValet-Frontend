import config from 'config';
import { authHeader } from '../_helpers';
import {userService } from '../_services';

export const vehicleService = {
    addVehicle,
    getAll,
    getSpecificVehicle,
    updateVehicleLocation,
    removeVehicle
};

function addVehicle(vehicle) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(vehicle)
    };
    localStorage.removeItem('vehicle');
    return fetch(`${config.apiUrl}/vehicles/register`, requestOptions).then(handleResponse);
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/vehicles`, requestOptions).then(handleResponse);
}

function getSpecificVehicle(locationName, carId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    var location = encodeURIComponent(locationName);
    var car = encodeURIComponent(carId);

    return fetch(`${config.apiUrl}/vehicles/specific/${location}/${car}`, requestOptions).then(handleResponse);
}

function updateVehicleLocation(id, vehicle) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(vehicle)
    };

    return fetch(`${config.apiUrl}/vehicles/${id}`, requestOptions).then(handleResponse);
}

function removeVehicle(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: { ...authHeader(), 'Content-Type': 'application/json'}
    }

    return fetch(`${config.apiUrl}/vehicles/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                userService.logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}