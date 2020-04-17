import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { vehicleActions } from '../_actions';
import { SingleVehicleLocation } from './SingleVehicleLocation';

class VehicleLocationPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            car: {
                location: ""
            },
            submittedVehicleLocation: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { car } = this.state;

        this.setState({
            car: {
                ...car,
                [name]: value
            }
        });
    }

    handleSubmit(id, event) {
            event.preventDefault();
            const { car } = this.state;
            this.setState({ submittedVehicleLocation: true });

            if(car.location)
                this.props.updateVehicle(id, car);
        
    }

    render() {
        const { car, submittedVehicleLocation } = this.state;
        const { vehicles } = this.props;
        return(
            <div className="col-md-6">
                <h2>Vehicles found</h2>
                <h4>Set parked location</h4>
                {vehicles.loading && <em>Loading vehicles...</em>}
                {vehicles.error && <span className="text-danger">ERROR: {vehicles.error}</span>}
                {vehicles.specificItem &&
                    <ul>
                        {vehicles.specificItem.map((vehicle, index) =>
                        <li key={vehicle._id}>
                            <SingleVehicleLocation vehiclePassed={vehicle}></SingleVehicleLocation>
                        </li>
                        )}
                    </ul>
                }
                <Link to='addVehicle'>
                    <button className='btn btn-dark'>Back</button>
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
    getVehicle: vehicleActions.getSpecificVehicle,
    updateVehicle: vehicleActions.updateVehiclesLocation
}

const connectedVehicleLocationPage = connect(mapState, actionCreators)(VehicleLocationPage);
export { connectedVehicleLocationPage as VehicleLocationPage };