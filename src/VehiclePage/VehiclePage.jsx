import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions, vehicleActions } from '../_actions';

class VehiclePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            vehicle: {
                vin: this.props.car.vin,
                make: this.props.car.make,
                model: this.props.car.model,
                year: this.props.car.year,
                color: '',
                carID: '',
                companyLocation: this.props.location.locationName
            },
            submittedVehicle: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submittedVehicle: true });
        const { vehicle } = this.state;

        if(!vehicle.year){
            this.setState({ vin: ' '});
        }

        this.props.addVehicle(vehicle);

        //if(vehicle.vin && vehicle.make && vehicle.model && vehicle.color) {
            //this.props.addVehicle(vehicle);
        //}

    }

    render() {
        const { car } = this.props;
        const { location } = this.props;
        const { vehicle, submittedVehicle } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
               {/*  <h1>This is the vehicle page.</h1>
                <p>Vehicle make: {car.make}</p>
                <p>Vehicle model: {car.model}</p>
                <p>Vehicle year: {car.year}</p> */}

                <form name="form" onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor="vin">Vin Number</label>
                        <input type="text" className="form-control" name="vin" defaultValue={vehicle.vin} onChange={this.handleChange} />
                        
                    </div>
                    <div className='form-group'>
                        <label htmlFor="make">Make of vehicle</label>
                        <input type="text" className="form-control" name="make" defaultValue={vehicle.make} onChange={this.handleChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="model">Model of vehicle</label>
                        <input type="text" className="form-control" name="model" defaultValue={vehicle.model} onChange={this.handleChange} />
                    </div>
                    <div className='form-group'>
                        <label htmlFor="year">Year</label>
                        <input type="text" className="from-control float-right" name="year" defaultValue={vehicle.year} onChange={this.handleChange} />
                    </div>
                    <div className={'form-group' + (submittedVehicle && !vehicle.color ? ' has-error' : '')}>
                        <label htmlFor="color">Color</label>
                        <input type="text" className="from-contorl float-right" name="color" value={vehicle.color} onChange={this.handleChange} />
                        {submittedVehicle && !vehicle.color &&
                            <div className="help-block">Vehicle color is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submittedVehicle && !vehicle.carID ? ' has-error' : '')}>
                        <label htmlFor="carID">ID #</label>
                        <input type="text" className="from-contorl float-right" name="carID" value={vehicle.carID} onChange={this.handleChange} />
                        {submittedVehicle && !vehicle.carID &&
                            <div className="help-block">Vehicle carID is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-dark" onClick={this.handleSubmit}>Add Vehicle</button>
                    </div>
                </form>

            </div>
        );
    }
}

function mapState(state) {
    const { car } = state.vehicle;
    const { location } = state.currentLocation;
    return { car, location };
}

const actionCreators = {
    getUsers: userActions.getAll,
    addVehicle: vehicleActions.addVehicle,
}

const connectedVehiclePage = connect(mapState, actionCreators)(VehiclePage);
export { connectedVehiclePage as VehiclePage };