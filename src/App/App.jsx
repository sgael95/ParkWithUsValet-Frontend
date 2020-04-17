import React from 'react';
import { Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { history, } from '../_helpers';
import { alertActions, userActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { AdminPage } from '../AdminPage';
import { VehiclePage } from '../VehiclePage';
import { AddVehiclePage } from '../AddVehiclePage';
import { VehicleLocationPage } from '../VehicleLocationPage';
import { VehicleTicketPage } from '../VehicleTicketPage';
import { AddLocationPage } from '../AddLocationPage';

class App extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });
    }

    render() {
        const { user, admin } = this.props;
        const { alert } = this.props;
        return (
                <Router history={history}>
                    <div>
                    {user &&
                        <nav className="navbar navbar-expand navbar-dark bg-dark">
                            <div className="navbar-nav">
                                <Link to="/" className="nav-item nav-link">Home</Link>
                                {admin && <Link to="/admin" className="nav-item nav-link">Admin</Link>}
                                <Link to='/login' className="nav-item nav-link">Logout</Link>
                            </div>
                        </nav>
                    }
                    <div className="jumbotron">
                        <div className="container">
                            <div className="col-sm-3 col-md-6 col-lg-8">
                                {alert.message &&
                                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                                }
                                    <Switch>
                                        <PrivateRoute exact path="/" component={HomePage} />
                                        <Route exact path="/admin" component={AdminPage} />
                                        <Route path="/login" component={LoginPage} />
                                        <Route path="/register" component={RegisterPage} />
                                        <Route path="/vehicle" component={VehiclePage} />
                                        <Route path="/addVehicle" component={AddVehiclePage} />
                                        <Route path="/vehicleLocationPage" component={VehicleLocationPage} />
                                        <Route path="/vehicleTicketPage" component={VehicleTicketPage} />
                                        <Route path="/addLocationPage" component={AddLocationPage} />
                                        <Redirect from="*" to="/" />
                                    </Switch>
                            </div>
                        </div>
                    </div>
                    </div>
                </Router>
        );
    }
}

function mapState(state) {
    const { alert, authentication } = state;
    const { user, admin } = authentication;
    return { alert, user, admin };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };