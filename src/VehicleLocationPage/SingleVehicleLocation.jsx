import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { vehicleActions } from '../_actions';

class SingleVehicleLocation extends React.Component {
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
        var vehicle = this.props.vehiclePassed;
        var _key = this.props.key;
        return(
            <div>
                {vehicle.make + ' ' + vehicle.model}
                {
                    vehicle.deleting ? <em> - Deleting...</em>
                    : vehicle.deletError ? <span className="text-danger"> - ERROR: {carChosen.deleteError}</span>
                    : <span>
                        <form name="form" onSubmit={(event) => this.handleSubmit(vehicle._id, event)}>
                            <div className={'form-group' + (submittedVehicleLocation && !car.location ? ' has-error' : ' no vin')}>
                                <input type="text" className="form-control" name="location" value={car.location} onChange={this.handleChange} />
                                {submittedVehicleLocation && !car.location &&
                                    <div className="help-block">Location is required.</div>
                                }
                                <button className='btn btn-dark' onClick={(event) => this.handleSubmit(vehicle._id, event)}>Submit</button>
                            </div>
                        </form>
                        </span>
                }
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

const connectedSingleVehicleLocation = connect(mapState, actionCreators)(SingleVehicleLocation);
export { connectedSingleVehicleLocation as SingleVehicleLocation };