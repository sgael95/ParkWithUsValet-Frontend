import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions, locationActions } from '../_actions';

class AdminPage extends React.Component {

    componentDidMount() {
        this.props.getUsers();
        this.props.getLocations();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    handleDeleteLocation(id) {
        return (e) => this.props.deleteLocation(id);
    }

    render() {
        const { user, users, locations } = this.props;
        return(
            <div className="col-md-6 col-md-offset-3">
                <h1>Welcome {user.firstName}!</h1>

                <h3>All locations:</h3>
                {locations.loading && <em>Loading locations...</em>}
                {locations.error && <span className="text-danger">ERROR: {locations.error}</span>}
                {locations.items &&
                    <ul>
                        {locations.items.map((location, index) =>
                            <li key={location._id} className="list-group-item d-flex justify-content-between lh-condensed">
                                {location.locationName}
                                {
                                    location.deleting ? <em> - Deleting...</em>
                                    : location.deleteError ? <span className="text-danger"> - ERROR: {location.deleteError}</span>
                                    : <span><button className="btn btn-danger" onClick={this.handleDeleteLocation(location._id)}>Delete</button></span>
                                }
                            </li>
                        )}
                    </ul>
                }

                <h3>All registered users:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <ul>
                        {users.items.map((user, index) =>
                            <li key={user.id} className="list-group-item d-flex justify-content-between lh-condensed">
                                {user.firstName + ' ' + user.lastName}
                                {
                                    user.deleting ? <em> - Deleting...</em>
                                    : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                    : <span><button className="btn btn-danger" onClick={this.handleDeleteUser(user.id)}>Delete</button></span>
                                }
                            </li>
                        )}
                    </ul>
                }
                <div>
                    <Link to="/login">
                        <button className="btn btn-dark">Logout</button>
                    </Link>
                    <Link to="/addLocationPage">
                        <button className="btn btn-secondary">Add Location</button>
                    </Link>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { users, locations, authentication } = state;
    const { user } = authentication;
    return { user, users, locations };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete,
    getLocations: locationActions.getAllLocations,
    deleteLocation: locationActions.delete
}


const connectedAdminPage = connect(mapState, actionCreators)(AdminPage);
export { connectedAdminPage as AdminPage };