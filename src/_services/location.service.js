import config from 'config';
import { authHeader } from '../_helpers';

export const locationService = {
    register,
    getAllLocations,
    getById,
    update,
    delete: _delete
};

function register(location) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(location)
    };

    return fetch(`${config.apiUrl}/locations/register`, requestOptions).then(handleResponse);
}

function getAllLocations() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/locations`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/locations/${id}`, requestOptions)
    .then(handleResponse)
    .then(location => {
        localStorage.setItem('location', JSON.stringify(location));
        return location;
    });
}

function update(location) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'content-Type': 'application/json' },
        body: JSON.stringify(location)
    };

    return fetch(`${config.apiUrl}/locations/${location.id}`, requestOptions).then(handleResponse);
}

function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/locations/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}