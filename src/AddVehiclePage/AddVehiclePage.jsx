import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


import { userActions, vehicleActions } from '../_actions';

class AddVehiclePage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            vehicle: {
                vin: ''
            },
            car: {
                id: ''
            },
            submittedVehicle: false,
            submittedCarId: false,
            companyLocation: this.props.location.locationName
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmptySubmit = this.handleEmptySubmit.bind(this);
        this.handleCarSubmit = this.handleCarSubmit.bind(this);
        this.handleIdChange = this.handleIdChange.bind(this);
        this.handleInfoSubmit = this.handleInfoSubmit.bind(this);
    }

    handleEmptySubmit(event) {
        const { vehicle } = this.state;
        this.setState({ submittedVehicle: true });
        this.props.setEmptyCar();
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { vehicle } = this.state;

        this.setState({
            vehicle: {
                ...vehicle,
                [name]: value
            }
        });
    }

    handleIdChange(event) {
        const { name, value } = event.target;
        const { car } = this.state;

        this.setState({
            car: {
                ...car,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const { vehicle } = this.state;
        this.setState({ submittedVehicle: true });
        this.props.getVehicleInfo(vehicle.vin);
        /* if(vehicle.vin) {
            this.props.getVehicleInfo(vehicle.vin);
        } */
    }

    handleCarSubmit(event) {
        event.preventDefault();

        const { car, companyLocation} = this.state;
        this.setState({ submittedCarId: true });

        if(car.id)
            this.props.getVehicle(companyLocation, car.id);
    }

    handleInfoSubmit(event) {
        event.preventDefault();

        const { car, companyLocation } = this.state;
        this.setState({ submittedCarId: true });

        if(car.id)
            this.props.getVehicleTicket(companyLocation, car.id);
    }

    render() {
        const { vehicle, car,  submittedVehicle, submittedCarId } = this.state;
        return(
            <div className="col-md-6 col-md-offset-3">
                <h2>Add vehicle</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submittedVehicle && !vehicle.vin ? ' has-error' : ' no vin')}>
                        <label htmlFor="vin">Vin Number</label>
                        <input type="text" className="form-control" name="vin" value={vehicle.vin} onChange={this.handleChange} />
                        {submittedVehicle && !vehicle.vin &&
                            <div className="help-block">Vin number is required.</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-dark" onClick={this.handleSubmit}>Search</button>
                        <Link to="/vehicle">
                            <button className="btn btn-secondary" onClick={this.handleEmptySubmit}>No Vin</button>
                        </Link>
                    </div>
                </form>
                <h2>Set Car Location</h2>
                <form name="form" onSubmit={this.handleInfoSubmit}>
                    <div className={'form-group' + (submittedCarId && !car.id ? ' has-error' : 'no vin')}>
                        <label htmlFor="id">Car ID number</label>
                        <input type="text" className="form-control" name="id" value={car.id} onChange={this.handleIdChange} />
                        {submittedCarId && !car.id &&
                            <div className="help-block">Car id number is required.</div>
                        }
                    </div>
                    <div className="form-group mt-3">
                        <button className="btn btn-dark" onClick={this.handleCarSubmit}>Set Location</button>
                        <button className="btn btn-secondary" onClick={this.handleInfoSubmit}>Car Info</button>
                    </div>
                </form>
            </div>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { location } = state.currentLocation;
    const { user } = authentication;
    return { user, users, location };
}

const actionCreators = {
    getVehicleInfo: userActions.getVehicleInfo,
    setEmptyCar: userActions.setEmptyVehicle,
    getVehicle: vehicleActions.getSpecificVehicle,
    getVehicleTicket: vehicleActions.getSpecificVehicleTicket
}

const connectedAddVehiclePage = connect(mapState, actionCreators)(AddVehiclePage);
export { connectedAddVehiclePage as AddVehiclePage };