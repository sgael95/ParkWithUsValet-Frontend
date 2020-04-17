import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import { locationActions } from '../_actions';

class HomePage extends React.Component {

    componentDidMount() {
        this.props.getLocations();
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

        const { vehicle } = this.state;
        this.setState({ submittedVehicle: true });
        this.props.getVehicleInfo(vehicle.vin);
        if(vehicle.vin){
            this.props.getVehicleInfo(vehicle.vin);
        }
    }

    handleSelectLocation(id) {
        return (e) => this.props.selectLocation(id);
    }

   render() {
       const { locations } = this.props;
       return(
           <div className="col-md-6 col-md-offset-3 col-sm-3">
               <h1>Please select a location</h1>
               {locations.loading && <em>Loading locations....</em>}
               {locations.error && <span className="text-danger">ERROR: {locations.error}</span>}
               {locations.items &&
                    <ul>
                        {locations.items.map((location, index) =>
                            <li key={location.id} className="list-group-item d-flex justify-content-between lh-condensed">
                                {location.locationName}
                                {<span>
                                    <button className="btn btn-dark" 
                                            onClick={this.handleSelectLocation(location.id)}>Select</button>
                                </span>}
                            </li>
                        )}
                    </ul>
               }
           </div>
       )
   }
}

function mapState(state) {
    const { users, locations, authentication } = state;
    const { user } = authentication;
    return { user, users, locations };
}

const actionCreators = {
    getVehicleInfo: userActions.getVehicleInfo,
    getLocations: locationActions.getAllLocations,
    selectLocation: locationActions.setLocation
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };