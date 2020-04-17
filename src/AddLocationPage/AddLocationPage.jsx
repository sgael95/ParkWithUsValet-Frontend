import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { locationActions } from '../_actions';

class AddLocationPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            location: {
                locationName: '',
                address: ''
            },
            submittedLocation: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { location } = this.state;
        
        this.setState({
            location: {
                ...location,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const { location } = this.state;
        this.setState({ submittedLocation: true });
        if(location)
            this.props.addLocation(location);
    }


    render() {
        const { location, submittedLocation } = this.state;
        return(
            <div className="col-md-6 col-md-offset-3">
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submittedLocation && !location.locationName ? ' has error ' : ' no location')}>
                        <label htmlFor="location">New Location</label>
                        <input type="text" className="form-control" name="locationName" value={location.locationName} onChange={this.handleChange} />
                        {submittedLocation && !location.locationName &&
                            <div className="help-block">Location name required</div>
                        }
                    </div>
                    <div className={'form-group' + (submittedLocation && !location.address ? ' has error ' : ' no address')}>
                        <label htmlFor="locationAddress">New Address</label>
                        <input type="text" className="form-control" name="address" value={location.address} onChange={this.handleChange} />
                            {submittedLocation && !location.address &&
                                <div className="help-block">Location address is required</div>
                            }
                    </div>
                </form>
                <button className="btn btn-dark" onClick={this.handleSubmit}>Submit</button>
            </div>
        );
    }
}

function mapState(state) {
    const { user } = state.authentication;
    return { user };
}

const actionCreators = {
    addLocation: locationActions.addLocation
}

const connectedAddLocationPage = connect (mapState, actionCreators)(AddLocationPage);
export { connectedAddLocationPage as AddLocationPage };