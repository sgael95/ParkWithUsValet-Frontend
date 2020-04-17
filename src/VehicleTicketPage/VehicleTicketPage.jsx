import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { VehicleActions, vehicleActions } from '../_actions';

class VehicleTicketPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = { removingVehicle: false };

        this.handleSubmmit = this.handleSubmmit.bind(this);
    }

    handleSubmmit(id, event) {
        event.preventDefault();
        this.setState({ removingVehicle: true });

        this.props.removeVehicle(id);
    }

    render() {
        const { vehicles } = this.props;
        return (
            <div className="col-md-6">
                <h2>Vehicles found</h2>
                {vehicles.loading && <em>Loading vehicles...</em>}
                {vehicles.error && <span className="text-danger">ERROR: {vehicles.error}</span>}
                {vehicles.specificItem &&
                    <ul className="list-group mb-3">
                        {vehicles.specificItem.map((vehicle, index) =>
                            <li key={vehicle._id} className="list-group-item d-flex justify-content-between lh-condensed">
                                <div>
                                    <h6 className="my-0">{vehicle.make + ' ' + vehicle.model}</h6>
                                    <h6 className="my-0">{vehicle.color + ' Year: ' + vehicle.year}</h6>
                                    <h6 className="my-0">{'Location: ' + vehicle.companyLocation}</h6>
                                    <h6 className="my-0">{'Parked: ' + vehicle.location}</h6>
                                </div>
                                {
                                    vehicle.deleting ? <em> - Deleting...</em>
                                    : vehicle.deletingError ? <span className="text-danger"> - ERROR: {car.deletingError}</span>
                                    : <span className="align-self-center">
                                        <button className="btn btn-danger" onClick={(even) => this.handleSubmmit(vehicle._id, event)}>Remove</button>
                                     </span>
                                }
                            </li>
                        )}
                    </ul>
                }
                <Link to="/addVehicle">
                    <button className="btn btn-dark">Back</button>
                </Link>
            </div>
        );
    }
}

function mapState(state) {
    const { vehicles } = state;
    return { vehicles };
}

const actionCreators = {
    updateVehicle: vehicleActions.updateVehiclesLocation,
    removeVehicle: vehicleActions.removeVehicle
}

const connectedVehicleTicketPage = connect(mapState, actionCreators)(VehicleTicketPage);
export { connectedVehicleTicketPage as VehicleTicketPage };